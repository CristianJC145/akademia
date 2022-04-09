import HomePage from './pages/Home.vue';
import {RouteRecordRaw} from 'vue-router';
import {authGuard} from '../../shared/guards/auth.guard';

export const adminRouting: RouteRecordRaw[] = [
    {
        path: 'home',
        component: HomePage,
        beforeEnter: [authGuard],
    },
];