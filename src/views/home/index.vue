<template>
    <div class="home">
        <div class="body">
            <div class="scroll-warpper">
                <ChatGroup
                    v-for="(item, index) in list"
                    :key="index"
                    :question="item.questionHTML"
                    :answer="item.answerHTML"
                ></ChatGroup>
            </div>
        </div>

        <div class="footer">
            <ToolBar
                v-model="question"
                :loading="loading"
                @click="togglePanel"
                @submit="queryAnswer"
            ></ToolBar>
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
import chatScene from './js/chatScene.js';
import MsgGroup from './js/MsgGroup.js';
import getAnswer from './js/getAnswer.js';

import ChatGroup from './components/chat-group.vue';
import ToolBar from './components/tool-bar.vue';
import Panel from './components/panel.vue';
import DrawerScene from './components/drawer-scene.vue';

export default {
    components: {
        ChatGroup,
        ToolBar,
        Panel,
        DrawerScene,
    },
    data() {
        return {
            question: '',

            loading: false,

            list: chatScene._list,
        };
    },
    methods: {
        togglePanel() {
            this.$refs.panel.toggleShow();
        },
        openDrawerScene() {
            this.$refs.DrawerScene.open();
        },
        shiftSceneHandler(sceneItem) {
            this.list = chatScene.load(sceneItem);

            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },
        // 发送问题，获取回答
        queryAnswer() {
            if (!this.question) {
                return;
            }

            this.loading = true;

            var contexts = chatScene.getContexts(),
                mg = new MsgGroup(this.question);

            chatScene.add(mg.msg);

            mg.loading();

            getAnswer(this.question, contexts, {
                start: () => {
                    // 滚动到最新回答
                    this.scrollToBottom();
                },
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

                    chatScene.save();
                },
            });

            this.question = '';
        },
        // 滚动到最新回答
        scrollToBottom() {
            var scroller = document.querySelector('.scroll-warpper'),
                sHeight = scroller.clientHeight,
                scrollCon = document.querySelector('.body'),
                cHeight = scrollCon.clientHeight;

            scrollCon.scrollTo(0, sHeight + cHeight);
        },
    },
    mounted() {
        this.scrollToBottom();
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
        }

        .footer{
            
        }
    }
</style>