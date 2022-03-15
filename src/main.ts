import {createApp} from 'vue';
import App from './App.vue';
import './index.css';
import plugins from './shared/plugins';
import {router} from './app.routing';
import Amplify from 'aws-amplify';
import {amplifyConstant} from './shared/constant/amplify.constant';
import {translations} from '@aws-amplify/ui';
import {I18n} from 'aws-amplify';

import 'bootstrap/scss/bootstrap.scss'
import "bootstrap"

Amplify.configure(amplifyConstant);
I18n.putVocabularies(translations);
I18n.setLanguage('es');

const app = createApp(App);

app.use(plugins.fortawesomePlugin);
app.use(router);

app.mount('#app');
