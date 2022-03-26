import HomePage from './pages/Home.vue';
import {RouteRecordRaw} from 'vue-router';
import {authGuard} from '../../shared/guards/auth.guard';
import {initDataResolver} from '../../shared/resolvers/initData.resolver';

export const adminRouting: RouteRecordRaw[] = [
    {
        path: 'home',
        component: HomePage,
        beforeEnter: [authGuard, initDataResolver],
    },
];