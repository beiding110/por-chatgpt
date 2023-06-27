import marked from 'marked';

/**
 * @typedef {Object} msgGroup 一组问答
 * @property {number} addtime - 添加时间
 * @property {string} answer - 回答原文，md格式
 * @property {string} answerHTML - 回答html字符串
 * @property {string} question - 提问原文
 * @property {string} questionHTML - 提问html字符串
 */

class MsgPop {
    constructor(question) {
        var addtime = new Date().pattern('yyyy/MM/dd hh:mm:ss');

        this.loadingText = '.';

        this.msg = {
            addtime, // 提问时间
            question, // 原问题
            answer: '', // 原回答
            questionHTML: question, // 格式化后的问题
            answerHTML: '', // 格式化后的回答
        };
    }

    /**@type {msgGroup} */
    msg = {}

    /**
     * 更新回答
     * @param {String} content 回答内容
     */
    updateAnswer(content) {
        this._stopTimer();

        this.msg.answer = content;
        this.msg.answerHTML = marked.parse(content);
    }

    get() {
        return this.msg;
    }

    /**
     * 展示加载状态
     */
    loading() {
        this._startTimer(() => {
            this.loadingText += '.';

            if (this.loadingText.length > 3) {
                this.loadingText = '.';
            }

            this.msg.answer = this.msg.answerHTML = this.loadingText;
        });
    }

    _startTimer(cb) {
        if (this.timer) {
            this._stopTimer();
        }

        this.loadingText = '.';

        this.timer = setInterval(() => {
            cb && cb();
        }, 500);
    }

    _stopTimer(cb) {
        clearInterval(this.timer);
        this.timer = null;

        cb && cb();
    }
}

export default MsgPop;