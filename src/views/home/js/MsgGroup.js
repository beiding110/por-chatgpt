class MsgPop {
    constructor(question) {
        var addtime = new Date().pattern('yyyy/MM/dd hh:mm:ss');

        this.loadingText = '.';

        this.msg = {
            addtime,
            question,
            answer: '',
        };
    }

    updateAnswer(content) {
        this.stopTimer();

        this.msg.answer = content;
    }

    get() {
        return this.msg;
    }

    loading() {
        this.startTimer(() => {
            this.loadingText += '.';

            if (this.loadingText.length > 3) {
                this.loadingText = '.';
            }

            this.msg.answer = this.loadingText;
        });
    }

    startTimer(cb) {
        if (this.timer) {
            this.stopTimer();
        }

        this.loadingText = '.';

        this.timer = setInterval(() => {
            cb && cb();
        }, 500);
    }

    stopTimer(cb) {
        clearInterval(this.timer);
        this.timer = null;

        cb && cb();
    }
}

export default MsgPop;