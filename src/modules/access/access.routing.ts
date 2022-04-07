import RolesPage from './pages/Roles.vue';
import {RouteRecordRaw} from 'vue-router';
import {authGuard} from '../../shared/guards/auth.guard';
import {initDataResolver} from '../../shared/resolvers/initData.resolver';

export const accessRouting: RouteRecordRaw[] = [
    {
        path: 'roles',
        component: RolesPage,
        beforeEnter: [authGuard, initDataResolver],
    },
];