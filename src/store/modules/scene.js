import {getScene} from '@/views/home/js/storeScene.js';

export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        setData(state, val) {
            state.data = val;
        },
    },
    actions: {
        queryScene({commit}) {
            var list = getScene();

            commit('setData', list);
        },
    }
};