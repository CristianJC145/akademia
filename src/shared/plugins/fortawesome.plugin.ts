import {App} from 'vue';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faHome,
    faBars,
    faExpand,
} from '@fortawesome/free-solid-svg-icons';

export default {
    install: (app: App) => {
        library.add(faHome);
        library.add(faBars);
        library.add(faExpand);

        app.component('font-awesome-icon', FontAwesomeIcon);
    },
};