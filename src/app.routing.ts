import * as VueRouter from 'vue-router';
import {NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw} from 'vue-router';
import {authRouting} from './modules/auth/auth.routing';
import AppEmptyLayout from './shared/layout/AppEmptyLayout.vue';
import AppLayout from './shared/layout/AppLayout.vue';
import {adminRouting} from './modules/admin/admin.routing';
import {academicAdministrationRouting} from './modules/academic-administration/academic-administration.routing';
import {casuridRouting} from './modules/casurid/casurid.routing';
import {accessRouting} from './modules/access/access.routing';
import {initDataResolver} from './shared/resolvers/initData.resolver';
import {ltiRouting} from './modules/lti-provider/lti.routing';
import {academicProgramsRouting} from './modules/academicPrograms/academicPrograms.routing';
import {useMeta} from 'vue-meta';

const appRouting: RouteRecordRaw[] = [
    {
        path: '/',
        component: AppEmptyLayout,
        beforeEnter: [initDataResolver],
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

            // Auth Module
            {
                path: '/academic-administration',
                component: AppLayout,
                children: academicAdministrationRouting,
            },

            // Access Module
            {
                path: '/access',
                component: AppLayout,
                children: accessRouting,
            },
            // Auth Module
            {
                path: '/lti',
                component: AppEmptyLayout,
                children: ltiRouting,
            },
            // Academic Programs
            {
                path: '/academic-programs',
                component: AppLayout,
                children: academicProgramsRouting,
            },
        ],
    },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: appRouting,
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    

    next();
});

export {
    router,
};