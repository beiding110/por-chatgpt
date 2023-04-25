export default [
    {
        path: `/home`,
        alias: '',
        component: () => import(/*webpackChunkName: 'home'*/ '@/views/home/index.vue'),
    },
]