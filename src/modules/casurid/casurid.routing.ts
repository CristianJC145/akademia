import CasuridLayout from './layouts/CasuridLayout.vue';
import HomePage from './pages/Home.vue';
import ShoppingCartPage from './pages/ShoppingCart.vue';

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
        ],
    },

];