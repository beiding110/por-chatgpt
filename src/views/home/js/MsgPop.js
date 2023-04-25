class MsgPop {
    constructor(content, type = 'q') {
        var addtime = new Date().pattern('yyyy/MM/dd hh:mm:ss');

        this.loadingText = '.';

        this.msg = {
            content,
            type,
            addtime,
        };
    }

    updateContent(content) {
        this.stopTimer();

        this.msg.content = content;
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

            this.msg.content = this.loadingText;
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