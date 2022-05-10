import LoginPage from './pages/Login.vue';

const appName = 'auth';

export const authRouting = [
    {
        path: 'login',
        component: LoginPage,
        name: `${appName}.login`,
    },
];