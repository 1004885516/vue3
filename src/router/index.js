import { createRouter, createWebHistory } from 'vue-router'
import gd from '@/utils/GlobalData'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "home" */ '@/views/login/Login.vue')
    },
    {
        path: '/Layout',
        name: 'Layout',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Layout/index.vue'),
        redirect: 'realtime_data',
        children: [
            {
                path: gd.RoutePath.RealTime_Data,
                name: 'RealTimeData',
                component: () => import ( /* webpackChunkName: "RealTimeData" */ "@/views/today_data/RealTimeData.vue"),
            },
            {
                path: gd.RoutePath.Realtime_Session,
                name: 'RealtimeSession',
                component: () => import ( /* webpackChunkName: "RealTimeData" */ "@/views/today_data/RealTimeSessionData.vue")
            },
        ]
    }
];

const router = createRouter({
    mode:'history',
    history: createWebHistory(), // History模式   createWebHashHistory() Hash模式
    routes
})
router.beforeEach((to, from, next) => {
    // document.title = to.matched[0].meta.title;
    // console.log('to : ', to);
    // console.log('from : ', from);
    next();
})
export default router