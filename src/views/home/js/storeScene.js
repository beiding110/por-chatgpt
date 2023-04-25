const KEY_NAME = 'TABLE_SCENE';

export function getScene() {
    var res = getLocal(KEY_NAME) || [];

    return res;
}

export function getSceneByName(name) {
    var res = getScene();

    if (!name) {
        return res;
    }

    var r = res.find(item => {
        return item.name === name;
    });

    if (!r) {
        return false;
    }

    return r.history;
}

export function updateScene(name, value) {
    var scene = getScene(name),
        targetIndex = scene.findIndex(item => {
            return item.name === name;
        });

    if (!~targetIndex) {
        let newItem = {
            name,
            history: value,
            id: new Date().getTime(),
        };

        scene.push(newItem);
    } else {
        scene[targetIndex].history = value;
    }

    setLocal(KEY_NAME, scene);
}

export function delSceneByName(name) {
    var scene = getScene(name),
        targetIndex = scene.findIndex(item => {
            return item.name === name;
        });

    if (~targetIndex) {
        scene.splice(targetIndex, 1);
    }

    setLocal(KEY_NAME, scene);
}