import CasuridLayout from './layouts/CasuridLayout.vue';
import HomePage from './pages/Home.vue';
import ShoppingCartPage from './pages/ShoppingCart.vue';
import ProductDetailPage from './pages/ProductDetail.vue';
import ShoppingPage from './pages/Shopping.vue';
import RegisterCostumerPage from './pages/RegisterCostumer.vue';
import ConfirmationPage from './pages/Confirmation.vue';
import ContentsPage from './pages/Contents.vue';
import AppLayout from '../../shared/layout/AppLayout.vue';
import {authGuard} from '../../shared/guards/auth.guard';

export const casuridRouting = [
    {
        path: '',
        component: CasuridLayout,
        children: [
            {
                path: '',
                component: HomePage,
            },
            {
                path: 'shopping-cart',
                component: ShoppingCartPage,
            },
            {
                path: 'detail/:slug',
                component: ProductDetailPage,
            },
            {
                path: 'shopping',
                component: ShoppingPage,
            },
            {
                path: 'register',
                component: RegisterCostumerPage,
            },
            {
                path: 'confirmation',
                component: ConfirmationPage,
            },
        ],
    },
    {
        path: 'casurid',
        component: AppLayout,
        beforeEnter: [authGuard],
        children: [
            {
                path: 'contents',
                component: ContentsPage,
            },
        ],
    },

];