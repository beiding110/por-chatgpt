<template>
    <div 
    class="chat-group"
    >
        <div 
        v-if="question"
        class="chat-row q"
        >
            <div 
                class="pop" 
                v-html="question"
            ></div>
        </div>

        <div 
        v-if="answer"
        class="chat-row a"
        >
            <div 
                class="pop"
                v-html="answer"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        question: {
            type: String,
            default: '',
        },
        answer: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
    .chat-group{
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
                word-break: break-all;
                overflow: hidden;
            }

            &.q{
                .pop{
                    background: #95EC69;
                }
            }
        }
    }
</style>

<style lang="scss">
.chat-row{
    code{
        display: block;
        margin: 1em;
        padding: 1em;
        background: #282C34;
        color: #ABB2BF;
        white-space: pre-wrap;
        box-sizing: border-box;
    }

    $tableBorderColor: #DCDFE6;

    table {
        margin: 1em;
        border-left: 1px solid $tableBorderColor;
        border-top: 1px solid $tableBorderColor;

        th, td {
            padding: 0.5em;
            border-right: 1px solid $tableBorderColor;
            border-bottom: 1px solid $tableBorderColor;
            box-sizing: border-box;
            white-space: pre-wrap;
        }
    }

    img{
        margin: 1em;
    }

    ol {
        margin: 1em;
        padding-left: 2em;

        li {
            list-style: auto;
        }
    }

    ul {
        margin: 1em;
        padding-left: 2em;

        li {
            list-style: auto;
        }
    }
}
</style>