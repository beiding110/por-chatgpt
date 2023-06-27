const KEY_NAME = 'PROVISIONAL_SCENE';

export function getScene() {
    var res = getLocal(KEY_NAME);

    return res;
}

export function updateScene(value, id = '') {
    let scene = {
        id,
        history: value,
    };

    setLocal(KEY_NAME, scene);
}

export function delScene() {
    setLocal(KEY_NAME, {});
}