<template>
    <div class="home">
        <div class="body">
            <div class="scroll-warpper">
                <div 
                v-for="(item, index) in list"
                class="char-group"
                :key="index"
                >
                    <div 
                    v-if="item.question"
                    class="chat-row q"
                    >
                        <div class="pop">
                            {{item.question}}
                        </div>
                    </div>

                    <div 
                    v-if="item.answer"
                    class="chat-row a"
                    >
                        <div class="pop">
                            {{item.answer}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="left">
                <el-button 
                    class="btn-submit"
                    size="small"
                    circle
                    icon="el-icon-plus"
                    :loading="loading"
                    @click="togglePanel"
                ></el-button>
            </div>

            <div class="center">
                <el-input 
                    class="input"
                    v-model="question"
                    type="textarea"
                    :autosize="{minRows: 1, maxRows: 6}"
                    @keydown.enter="queryAnswer"
                ></el-input>
            </div>

            <div class="right">
                <el-button 
                    class="btn-submit"
                    type="success" 
                    size="small"
                    icon="el-icon-s-promotion"
                    :loading="loading"
                    @click="queryAnswer"
                ></el-button>
            </div>
        </div>

        <Panel 
            ref="panel"
            :data.sync="list"
            @shiftScene="openDrawerScene"
        ></Panel>

        <DrawerScene
            ref="DrawerScene"
            @shift="shiftSceneHandler"
        ></DrawerScene>
    </div>
</template>

<script>
import MsgGroup from './js/MsgGroup.js';
import getAnswer from './js/getAnswer.js';

import Panel from './components/panel.vue';
import DrawerScene from './components/drawer-scene.vue';

export default {
    components: {
        Panel,
        DrawerScene,
    },
    data() {
        return {
            question: '',

            list: [],

            loading: false,
        };
    },
    methods: {
        togglePanel() {
            this.$refs.panel.toggleShow();
        },
        openDrawerScene() {
            this.$refs.DrawerScene.open();
        },
        shiftSceneHandler(history) {
            this.list = history;
        },

        getContexts() {
            var list = this.list;

            return list.map(item => {
                return {
                    question: item.question,
                    answer: item.answer,
                };
            });
        },
        queryAnswer() {
            if (!this.question) {
                return;
            }

            this.loading = true;

            var contexts = this.getContexts(),
                mg = new MsgGroup(this.question);

            this.list.push(mg.msg);
            mg.loading();

            this.$nextTick(() => {
                // 滚动到最新回答
                this.scrollToBottom();
            });

            getAnswer(this.question, contexts, {
                success: content => {
                    mg.updateAnswer(content);
                },
                error: err => {
                    mg.updateAnswer(`错误：${err}`);

                    // 将失败的问题重新存入问题框
                    this.question = mg.msg.question;
                },
                complete: () => {
                    this.loading = false;
                },
            });

            this.question = '';
        },
        // 滚动到最新回答
        scrollToBottom() {
            var ans = document.querySelectorAll('.chat-row.a'),
                last = ans[ans.length - 1];

            last.scrollIntoView({
                behavior: 'smooth',
            });
        },
    },
    mounted() {
        var placeholder = new MsgGroup('');

        placeholder.updateAnswer('Por\'s chatgpt. Powered by Bito.');
        this.list.push(placeholder.msg);
    },
};
</script>

<style lang="scss" scoped>
    .home{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        font-size: 14px;

        .body{
            flex: 1;
            background: #F5F5F5;
            overflow: hidden;
            overflow-y: auto;

            .scroll-warpper{
                padding: 1em;
            }

            .chat-row{
                display: flex;
                font-size: 1em;
                padding: .5em 0;

                &.q{
                    justify-content: end;
                    padding-left: 1em;
                }

                &.a{
                    justify-content: start;
                    padding-right: 1em;
                }

                .pop{
                    background: white;
                    padding: .5em;
                    border-radius: .3em;
                    color: #232323;
                }

                &.q{
                    .pop{
                        background: #95EC69;
                    }
                }
            }
        }

        .footer{
            display: flex;
            padding: .5em;

            .left{
                display: flex;
                align-items: center;
                margin-right: .5em;
            }

            .center{
                flex: 1;
                display: flex;
                align-items: center;
                
                .input{
                    
                }
            }

            .right{
                display: flex;
                align-items: center;
                margin-left: .5em;

                .btn-submit{
                    height: 100%;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>