<template>
    <div class="tool-bar">
        <div 
        v-if="showLeft"
        class="left"
        >
            <el-button 
                class="btn-submit"
                size="small"
                circle
                icon="el-icon-plus"
                :loading="loading"
                @click="leftClick"
            ></el-button>
        </div>

        <div class="center">
            <el-input 
                class="input"
                v-model="model"
                type="textarea"
                :autosize="{minRows: 1, maxRows: 6}"
                @keydown.enter.prevent.native="submitHandler"
            ></el-input>
        </div>

        <div class="right">
            <el-button 
                class="btn-submit"
                type="success" 
                size="small"
                icon="el-icon-s-promotion"
                :loading="loading"
                @click="submitHandler"
            ></el-button>
        </div>
    </div>
</template>

<script>
import MODEL_MIXIN from '@mixins/model.js';

export default {
    mixins: [MODEL_MIXIN],
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            default: '',
        },
        showLeft: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        leftClick() {
            this.$emit('click');
        },
        submitHandler() {
            this.$emit('submit');
        },
    },
};
</script>

<style lang="scss" scoped>
    .tool-bar {
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
</style>