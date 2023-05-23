import marked from 'marked';
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