import * as VueRouter from 'vue-router';
import {RouteRecordRaw} from 'vue-router';
import {authRouting} from './modules/auth/auth.routing';
import AppEmptyLayout from './shared/layout/AppEmptyLayout.vue';
import AppLayout from './shared/layout/AppLayout.vue';
import {adminRouting} from './modules/admin/admin.routing';
import courseAdministration from "./modules/academic-administration/pages/CourseAdministration.vue";
import {academicAdministrationRouting} from "./modules/academic-administration/academic-administration.routing";

const appRouting: RouteRecordRaw[] = [
    {
        path: '/',
        component: AppEmptyLayout,
        redirect: '/admin/home',
        children: [
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

            // Auth Module
            {
                path: '/academic-administration',
                component: AppLayout,
                children: academicAdministrationRouting,
            },
        ],
    },
];

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: appRouting,
});