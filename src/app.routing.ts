import * as VueRouter from 'vue-router';
import {RouteRecordRaw} from 'vue-router';
import {authRouting} from './modules/auth/auth.routing';
import AppEmptyLayout from './shared/layout/AppEmptyLayout.vue';
import AppLayout from './shared/layout/AppLayout.vue';
import {adminRouting} from './modules/admin/admin.routing';
import {casuridRouting} from './modules/casurid/casurid.routing';

const appRouting: RouteRecordRaw[] = [
    {
        path: '/',
        component: AppEmptyLayout,
        children: [
            //Casurid Module
            {
                path: '',
                component: AppEmptyLayout,
                children: casuridRouting,
            },

            // Admin Module
            {
                path: '/admin',
                component: AppLayout,
                children: adminRouting,
            },

            // Auth Module
            {
                path: '/auth',
                component: AppEmptyLayout,
                children: authRouting,
            },
        ],
    },
];

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: appRouting,
});