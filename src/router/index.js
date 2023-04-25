import Vue from 'vue';
import Router from 'vue-router';

import home from './modules/home.js';

Vue.use(Router);

var router = new Router({
    routes: [
        ...home,
    ]
});

export default router