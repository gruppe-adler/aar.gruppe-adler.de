import Vue from 'vue';
import Router, { Route } from 'vue-router';

Vue.use(Router);

// @ts-ignore
export default new Router({
    mode: 'history',
    linkActiveClass: 'grad-nav--active',
    linkExactActiveClass: '',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            component: {
                template: 'four o four'
            }
        },
        {
            path: '/',
            redirect: '/replays'
        },
        {
            path: '/replay/:id',
            component: () => import('@/views/Replay.vue'),
            props: true
        },
        {
            path: '/replays',
            component: () => import('@/views/Replays.vue')
        }
    ]
});
