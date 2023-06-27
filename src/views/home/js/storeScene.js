const KEY_NAME = 'TABLE_SCENE';

export function getScene() {
    var res = getLocal(KEY_NAME) || [];

    return res;
}

export function getSceneBy(key = 'name', value) {
    var res = getScene(),
        r;

    if (!value) {
        return res;
    }

    r = res.find(item => {
        return item[key] === value;
    });

    if (!r) {
        return false;
    }

    return r.history;
}

export function updateSceneBy(key = 'name', value, data) {
    var scene = getScene(),
        targetIndex = scene.findIndex(item => {
            return item[key] === value;
        });

    if (!~targetIndex) {
        let time = new Date().getTime(),
            newItem = {
                name: `对话-${time}`,
                history: data,
                id: time,
            };
        
        newItem[key] = value;

        scene.push(newItem);
    } else {
        scene[targetIndex].history = data;
    }

    setLocal(KEY_NAME, scene);
}

export function delSceneBy(key, value) {
    var scene = getScene(),
        targetIndex = scene.findIndex(item => {
            return item[key] === value;
        });

    if (~targetIndex) {
        scene.splice(targetIndex, 1);
    }

    setLocal(KEY_NAME, scene);
}