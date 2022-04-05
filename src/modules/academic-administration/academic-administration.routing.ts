import {RouteRecordRaw} from 'vue-router';
import {authGuard} from '../../shared/guards/auth.guard';
import {initDataResolver} from '../../shared/resolvers/initData.resolver';
import CourseAdministrationPage from "./pages/CourseAdministration.vue";

export const academicAdministrationRouting: RouteRecordRaw[] = [
    {
        path: 'course-administration',
        component: CourseAdministrationPage,
        beforeEnter: [authGuard, initDataResolver],
    },
];