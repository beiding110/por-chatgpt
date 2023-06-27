<template>
    <el-drawer
    title="场景"
    :visible.sync="visibleController"
    direction="rtl"
    :size="250"
    >
        <div class="scene-list">
            <div 
            v-for="(item, index) in list"
            :key="index"
            class="item"
            @click="shiftScene(item)"
            >
                <div class="left">
                    <div class="color-dot" :style="{backgroundColor: calcColor(item)}"></div>

                    {{item.name}}
                </div>

                <div class="right">
                    <i class="el-icon-close" @click.stop="delHandler(item, index)"></i>
                </div>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import {getScene, delSceneByName} from '../js/storeScene.js';

export default {
    data() {
        return {
            visibleController: false,

            list: [],
        };
    },
    methods: {
        open() {
            this.list = getScene();

            this.visibleController = true;
        },
        close() {
            this.visibleController = false;
        },
        delHandler(item, index) {
            showConfirm('确认删除', 'warning', () => {
                delSceneByName(item.name);

                this.list.splice(index, 1);
            });
        },
        calcColor(item) {
            var {id} = item,
                color;

            id += '';

            color = id.slice(-6);

            return `#${color}`;
        },
        shiftScene(item) {
            this.$emit('shift', item);

            this.close();
        },
    },
    created() {
        
    },
};
</script>

<style lang="scss" scoped>
    .scene-list{
        padding: 0 20px 20px;

        .item{
            display: flex;
            align-content: center;
            line-height: 1em;
            padding: .6em 0;

            .left{
                display: flex;
                align-content: center;
                flex: 1;

                .color-dot{
                    display: block;
                    background: red;
                    width: 1em;
                    height: 1em;
                    border-radius: 50%;
                    margin-right: .6em;
                }
            }

            .right{
                font-size: 16px;
            }
        }
    }
</style>