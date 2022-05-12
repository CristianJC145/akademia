import {RouteRecordRaw} from 'vue-router';
import RolesPage from './pages/Roles.vue';

export const accessRouting: RouteRecordRaw[] = [
    {
        path: 'roles',
        component: RolesPage,
    },
];