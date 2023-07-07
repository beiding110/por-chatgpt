<template>
    <div class="sidebar">
        <div class="header">
            <div class="logo">
                <img src="/config/logo.png" alt="">

                <div class="text">
                    por-chatgpt
                </div>
            </div>
        </div>

        <div class="body">
            <ListScene 
                theme="dark"
                @shift="$emit('shift', $event)"
                @del="$emit('del', $event)"
            ></ListScene>
        </div>

        <div class="footer">
            <div 
            class="btn" 
            @click="$emit('createNew')"
            >
                <i class="icon el-icon-plus"></i>

                <div class="text">
                    新建空对话
                </div>
            </div>

            <div 
            class="btn"
            @click="saveHandler"
            >
                <i class="icon el-icon-folder-checked"></i>

                <div class="text">
                    对话保存为
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {updateSceneBy} from '../../js/storeScene.js';

import ListScene from '../list-scene.vue';

export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        ListScene,
    },
    data() {
        return {
            
        };
    },
    methods: {
        saveHandler() {
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
        },
    },
    created() {
        
    },
};
</script>

<style lang="scss" scoped>
    .sidebar{
        display: flex;
        flex-direction: column;
        width: 200px;
        background: #2E2E2E;
        overflow: hidden;

        .header{
            display: flex;
            justify-content: center;

            .logo{
                display: flex;
                align-items: center;

                img{
                    display: inline-block;
                    height: 50px;
                    margin-right: 10px;
                }

                .text{
                    font-size: 18px;
                    font-weight: bold;
                    color: white;
                }
            }
        }

        .body{
            flex: 1;
            overflow: hidden;
            overflow-y: auto;
            padding: 10px;
        }

        .footer{
            display: flex;
            position: relative;

            &:before{
                content: '';
                display: block;
                width: 90%;
                height: 1px;
                background: #ABB2BF;
                position: absolute;
                left: 50%;
                top: 0;
                transform: translateX(-50%);
            }

            .btn{
                flex: 1;
                display: flex;
                align-items: center;
                flex-direction: column;
                font-size: 14px;
                color: #DCDFE6;
                padding: .8em 0;
                cursor: pointer;
                transition: .3s all;

                &:hover{
                    font-weight: bold;
                }

                .icon{
                    font-size: 1.5em;
                    margin-bottom: 4px;
                }
            }
        }
    }
</style>