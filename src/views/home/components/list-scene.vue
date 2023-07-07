<template>
    <div 
    class="scene-list"
    :class="[theme]"
    >
        <div 
        v-for="(item, index) in list"
        :key="index"
        class="item"
        @click="shiftScene(item)"
        >
            <div class="left">
                <div class="color-dot" :style="{backgroundColor: calcColor(item)}"></div>

                <div class="text">
                    {{item.name}}
                </div>
            </div>

            <div class="right">
                <i class="el-icon-close" @click.stop="delHandler(item, index)"></i>
            </div>
        </div>
    </div>
</template>


<script>
import {mapState, mapActions} from 'vuex';

import {delSceneBy} from '../js/storeScene.js';

export default {
    props: {
        theme: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            // list: [],
        };
    },
    computed: {
        ...mapState({
            list: state => state.scene.data,
        }),
    },
    methods: {
        ...mapActions({
            reload: 'scene/queryScene'
        }),
        delHandler(item) {
            showConfirm('确认删除', 'warning', () => {
                let {id} = item;

                delSceneBy('id', id);
                
                this.reload();

                this.$emit('del', id);
            });
        },
        calcColor(item) {
            var {id} = item,
                num,
                color;

            id += '';

            num = id.slice(-3);

            color = Math.floor(num / 1000 * 16777216).toString(16);

            return `#${color}`;
        },
        shiftScene(item) {
            this.$emit('shift', item);
        },
    },
    created() {
        this.reload();
    },
};
</script>

<style lang="scss" scoped>
    .scene-list{
        &.dark{
            color: #DCDFE6;

            .item{
                .left{
                    .color-dot{
                        border-radius: 4px;
                        border: 1px solid #DCDFE6;
                        box-sizing: border-box;
                    }
                }
            }
        }

        .item{
            display: flex;
            align-content: center;
            line-height: 1em;
            padding: .8em 0;

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

                .text{
                    flex: 1;
                }
            }

            .right{
                font-size: 16px;
                margin-left: 1em;
            }
        }
    }
</style>