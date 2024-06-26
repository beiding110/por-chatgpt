import MsgGroup from './MsgGroup.js';
import {getScene as getProvisionalScene, updateScene as updateProvisionalScene} from './storeSceneProvisional.js';
import {updateSceneBy as updateSceneTableBy} from '../js/storeScene.js';

/**
 * @typedef {import('./MsgGroup.js').msgGroup[]} historyList 聊天历史
 */

/**
 * @typedef {Object} sceneItem 一组对话
 * @property {number} id - 编号
 * @property {string} name - 对话名称
 * @property {historyList} history - 聊天记录
 */

class ChatScene {
    constructor() {
        this._id = '';

        /**@type {historyList} */
        this._list = [];

        // 获取上次操作中的场景
        var pScene = getProvisionalScene();

        if (pScene) {
            // 有就加载
            this.load(pScene);
        } else {
            // 没有就创建新的
            this.create();
        }
    }

    /**
     * 创建空场景
     * @returns 创建后的场景list
     */
    create() {
        this._id = '';
        this._list = [];

        var placeholder = new MsgGroup('');

        placeholder.updateAnswer('Por\'s chatgpt. Powered by Bito.');

        this.add(placeholder.msg);

        // 更新存储数据
        this.save();

        return this._list;
    }

    /**
     * 加载历史记录
     * @param {sceneItem} sceneItem 场景实例
     * @returns 挂载后的数据
     */
    load(sceneItem) {
        var {history, id} = sceneItem;

        this._list = history;
        this._id = id;

        updateProvisionalScene(history, id);

        return this._list;
    }

    /**
     * 增加一段对话
     * @param {import('./MsgGroup.js').msgGroup} msg 对话对象
     */
    add(msg) {
        this._list.push(msg);
    }

    /**
     * 获取提问历史
     * @param {Number} length 历史长度
     * @returns 格式化的提问历史
     */
    getContexts(length = 6) {
        var list = this._list;

        // 过滤不需要发送的内容
        // 获取历史记录作为上下文
        return list.filter(item => {
            return item.question;
        }).slice(-1 * length).map(item => {
            return {
                question: item.question,
                answer: item.answer,
            };
        });
    }

    /**
     * 缓存当前场景
     */
    save() {
        // 更新临时存储
        updateProvisionalScene(this._list);

        // 更新场景表中对应的数据
        if (this._id) {
            updateSceneTableBy('id', this._id, this._list);
        }
    }

    bindId(id) {
        this._id = id;

        updateProvisionalScene(this._list, id);
    }

    deBindId(id) {
        if (this._id === id) {
            this._id = '';

            updateProvisionalScene(this._list, '');
        }
    }
}

export default new ChatScene();