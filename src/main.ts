import {createApp} from 'vue';
import Amplify from 'aws-amplify';
import {translations} from '@aws-amplify/ui';
import {I18n} from 'aws-amplify';

import App from './App.vue';
import plugins from './shared/plugins';
import {router} from './app.routing';
import {amplifyConstant} from './shared/constant/amplify.constant';

import './index.css';
import './assets/theme/index.scss';
import 'bootstrap';

Amplify.configure(amplifyConstant);
I18n.putVocabularies(translations);
I18n.setLanguage('es');

const app = createApp(App);

app.use(plugins.fortawesomePlugin);
app.use(router);

app.mount('#app');
