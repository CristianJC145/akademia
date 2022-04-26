import CasuridLayout from './layouts/CasuridLayout.vue';
import HomePage from './pages/Home.vue';
import ShoppingCartPage from './pages/ShoppingCart.vue';
import ProductDetailPage from './pages/ProductDetail.vue';
import ShoppingPage from './pages/Shopping.vue';
import RegisterCostumerPage from './pages/RegisterCostumer.vue';

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
        ],
    },

];