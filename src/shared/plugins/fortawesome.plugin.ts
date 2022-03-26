import {App} from 'vue';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faHome,
    faBars,
    faExpand,
    faUserCircle,
    faSignOutAlt,
    faEye,
    faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

export default {
    install: (app: App) => {
        library.add(faHome);
        library.add(faBars);
        library.add(faExpand);
        library.add(faUserCircle);
        library.add(faSignOutAlt);
        library.add(faEye);
        library.add(faEyeSlash);

        app.component('font-awesome-icon', FontAwesomeIcon);
    },
};