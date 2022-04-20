import {createApp} from 'vue';
import Amplify from 'aws-amplify';
import {translations} from '@aws-amplify/ui';
import {I18n} from 'aws-amplify';

import App from './App.vue';
import plugins from './shared/plugins';
import {router} from './app.routing';
import {amplifyConstant} from './shared/constant/amplify.constant';
import VueToast from 'vue-toast-notification';
import i18n from './shared/plugins/i18n.plugin';

import 'vue-toast-notification/dist/theme-sugar.css';
import './index.css';
import './assets/theme/index.scss';
import 'bootstrap';
import {TooltipDirective} from './shared/directives/tooltip.directive';

Amplify.configure(amplifyConstant);
I18n.putVocabularies(translations);
I18n.setLanguage('es');

const app = createApp(App);

app.use(i18n);
app.use(plugins.fortawesomePlugin);
app.use(router);
app.use(VueToast);

/*Akademia Directives*/
app.directive('tooltip', TooltipDirective);

app.mount('#app');
