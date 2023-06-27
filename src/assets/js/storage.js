var owner = {};

const NAME_SPACE = '';

/**
 * 设置storage基方法
 * @param  {string} type sessionStorage或localStorage
 * @param  {string} key  要取的key
 * @return {string|Object}      对应存储的数据
 */
function getStorage(type, key) {
    var storageKey = `${NAME_SPACE}${key}`,
        storageData = window[type][storageKey];

    if (key) {
        if (!storageData) {
            return false;
        }

        let obj = JSON.parse(storageData);

        return obj.value;
    }

    let data = window[type];

    var res = Object.keys(data).reduce((obj, sKey) => {
        let sv = window[type][sKey];

        sv = JSON.parse(sv);

        obj[sKey] = sv.value;
    }, {});

    return res;
}
/**
 * 获取storage基方法
 * @param {string} type  sessionStorage或localStorage
 * @param {string|object} key   要设置的key或整个对象
 * @param {Object} value 已设置的结果
 */
function setStorage(type, key, value) {
    if (typeof key === 'string') {
        let sType = getType(value),
            sValue = value,
            obj;

        obj = {
            type: sType,
            value: sValue,
        };

        window[type][`${NAME_SPACE}${key}`] = JSON.stringify(obj);
    } else if (typeof key === 'object') {
        Object.keys(key).forEach(function (item) {
            let val = key[item],
                sType = getType(val),
                sValue = val,
                obj;
                
            obj = {
                type: sType,
                value: sValue,
            };
    
            window[type][`${NAME_SPACE}${item}`] = JSON.stringify(obj);
        });
    }

    return window[type];
}

/**
 * 获取localStorage里的数据
 * @param  {string} key 待获取的key
 * @return {string|Object} 取回的值
 */
owner.getLocal = function (key) {
    return getStorage('localStorage', key);
}

/**
 * 将值存入localStorage
 * @param  {string|Object} key   待存值的key或json对象
 * @param  {string|object} value 待存值的value
 * @return {object}       存入后localStorage对象
 */
owner.setLocal = function (key, value) {
    return setStorage('localStorage', key, value);
}

/**
 * 获取sessionStorage里的数据
 * @param  {string} key 待获取的key
 * @return {string|Object} 取回的值
 */
owner.getSession = function (key) {
    return getStorage('sessionStorage', key);
}

/**
 * 将值存入sessionStorage
 * @param  {string|Object} key   待存值的key或json对象
 * @param  {string|object} value 待存值的value
 * @return {object}       存入后sessionStorage对象
 */
owner.setSession = function (key, value) {
    return setStorage('sessionStorage', key, value);
}

export default owner