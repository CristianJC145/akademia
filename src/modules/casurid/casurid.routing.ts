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
import ContentsCreatePage from './pages/ContentsCreate.vue';
import ContentsEditPage from './pages/ContentsEdit.vue';
import PlansPage from './pages/Plans.vue';
import PlansCreatePage from './pages/PlansCreate.vue';
import PlansEditPage from './pages/PlansEdit.vue';
import InstitutionsPage from './pages/Institutions.vue';
import InstitutionsCreatePage from './pages/InstitutionsCreate.vue';
import InstitutionsEditPage from './pages/InstitutionsEdit.vue';
import ContentPlanByInstitutionPage from './pages/contentPlanByInstitution.vue';
import SalesPage from './pages/Sales.vue';
import SalesEditPage from './pages/SalesEdit.vue';
import ProfilePage from './pages/Profile.vue';
import QuotasPage from './pages/quotas.vue';

const appName = 'casurid';

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
                beforeEnter: [authGuard],
                name: `${appName}.shoppingCart`,
            },
            {
                path: 'detail/:slug',
                component: ProductDetailPage,
            },
            {
                path: 'shopping',
                component: ShoppingPage,
                beforeEnter: [authGuard],
            },
            {
                path: 'register',
                component: RegisterCostumerPage,
                name: `${appName}.register`,
            },
            {
                path: 'confirmation',
                component: ConfirmationPage,
            },
            {
                path: 'profile',
                component: ProfilePage,
                beforeEnter: [authGuard],
                name: `${appName}.profile`,
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
                name: `${appName}.contentsList`,
            },
            {
                path: 'contents/create',
                component: ContentsCreatePage,
                name: `${appName}.contentsCreate`,
            },
            {
                path: 'contents/:contentId/edit',
                component: ContentsEditPage,
                name: `${appName}.contentsEdit`,
            },
            {
                path: 'plans',
                component: PlansPage,
                name: `${appName}.plansList`,
            },
            {
                path: 'plans/create',
                component: PlansCreatePage,
                name: `${appName}.plansCreate`,
            },
            {
                path: 'plans/:planId/edit',
                component: PlansEditPage,
                name: `${appName}.plansEdit`,
            },
            {
                path: 'sales',
                component: SalesPage,
                name: `${appName}.salesList`,
            },
            {
                path: 'sales/:saleId/edit',
                component: SalesEditPage,
                name: `${appName}.salesEdit`,
            },
            {
                path: 'institutions',
                component: InstitutionsPage,
                name: `${appName}.institutionsList`,
            },
            {
                path: 'institutions/create',
                component: InstitutionsCreatePage,
                name: `${appName}.institutionsCreate`,
            },
            {
                path: 'institutions/:institutionId/edit',
                component: InstitutionsEditPage,
                name: `${appName}.institutionsEdit`,
            },
            {
                path: 'institutions/:institutionId/contentPlan',
                component: ContentPlanByInstitutionPage,
                name: `${appName}.institutionsContentPlan`,
            },
            {
                path: 'quotas',
                component: QuotasPage,
                name: `${appName}.quotasList`,
            },
        ],
    },

];