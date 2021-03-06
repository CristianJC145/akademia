import {createApp} from 'vue';

import App from './App.vue';
import plugins from './shared/plugins';
import {router} from './app.routing';
import VueToast from 'vue-toast-notification';
import i18n from './shared/plugins/i18n.plugin';
import {createMetaManager} from 'vue-meta';

// @ts-ignore
import vSelect from 'vue-select';

import 'vue-toast-notification/dist/theme-sugar.css';
import './index.css';
import './assets/theme/index.scss';
import 'vue-select/dist/vue-select.css';
import 'bootstrap';
import {TooltipDirective} from './shared/directives/tooltip.directive';

const app = createApp(App);

app.use(i18n);
app.use(plugins.fortawesomePlugin);
app.use(router);
app.use(VueToast);
app.use(createMetaManager());

// await router.isReady();

app.component('v-select', vSelect);

/*Akademia Directives*/
app.directive('tooltip', TooltipDirective);

app.mount('#app');
