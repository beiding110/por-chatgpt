<template>
    <el-collapse-transition>
        <div 
        v-if="showController"
        class="panel"
        >
            <div 
            v-for="(item, index) in list"
            :key="index"
            class="item"
            >
                <div class="btn" @click="item.handler">
                    <div class="icon">
                        <i :class="item.icon"></i>
                    </div>
                    <div class="name">
                        {{item.title}}
                    </div>
                </div>
            </div>
        </div>
    </el-collapse-transition>
</template>

<script>
import {updateSceneBy} from '../js/storeScene.js';

export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            showController: false,

            list: [
                {
                    title: '新建空对话',
                    icon: 'el-icon-plus',
                    handler: () => {
                        this.$emit('createNew');

                        this.toggleShow();
                    },
                },
                {
                    title: '对话保存为',
                    icon: 'el-icon-folder-checked',
                    handler: () => {
                        this.$prompt('对话名称', '提示', {
                            confirmButtonText: '创建',
                            cancelButtonText: '取消',
                            inputValidator(val) {
                                if (!val) {
                                    return '请输入对话名称';
                                }

                                return true;
                            }
                        }).then(({ value }) => {
                            var data = updateSceneBy('name', value, this.data);

                            this.$emit('save', data);
                        });

                        this.toggleShow();
                    },
                },
                {
                    title: '切换对话',
                    icon: 'el-icon-refresh',
                    handler: () => {
                        this.$emit('shiftScene');

                        this.toggleShow();
                    },
                },
            ],
        };
    },
    methods: {
        toggleShow() {
            this.showController = !this.showController;
        },
    },
};
</script>

<style lang="scss">
    .panel{
        display: flex;
        flex-wrap: wrap;
        border-top: 1px solid #DCDFE6;

        .item{
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 25%;
            text-align: center;
            padding: 20px 0;

            .btn{
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                width: 60px;
                height: 60px;

                .icon{
                    width: 100%;
                    font-size: 24px;
                    color: #606266;
                }

                .name{
                    width: 100%;
                    font-size: 12px;
                    color: #606266;
                }
            }
        }
    }
</style>