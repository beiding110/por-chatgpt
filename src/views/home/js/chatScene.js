import MsgGroup from './MsgGroup.js';

class ChatScene {
    constructor() {
        this._list = [];

        this.create();
    }

    /**
     * 创建空场景
     * @returns 创建后的场景list
     */
    create() {
        this._list = [];

        var placeholder = new MsgGroup('');

        placeholder.updateAnswer('Por\'s chatgpt. Powered by Bito.');

        this.add(placeholder.msg);

        return this._list;
    }

    /**
     * 加载历史记录
     * @param {Array} history 历史记录
     * @returns 挂载后的数据
     */
    load(history) {
        this._list = history;

        return this._list;
    }

    /**
     * 增加一段对话
     * @param {Object} msg 对话对象
     */
    add(msg) {
        this._list.push(msg);
    }

    /**
     * 获取提问历史
     * @returns 格式化的提问历史
     */
    getContexts() {
        var list = this._list;

        // 过滤不需要发送的内容
        // 获取历史记录作为上下文
        return list.filter(item => {
            return item.question;
        }).map(item => {
            return {
                question: item.question,
                answer: item.answer,
            };
        });
    }
}

export default new ChatScene();