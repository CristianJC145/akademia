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
    faExclamationTriangle,
    faUserFriends,
    faClipboardList,
    faCalendarMinus,
    faBuilding,
    faBookOpen,
    faGraduationCap,
    faChartLine,
    faCalendarWeek,
    faUsers,
    faShoppingCart,
    faSearch,
    faFilter,
    faSignInAlt,
    faPlus,
    faKey,
    faPencilAlt,
    faTrash,
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
        library.add(faShoppingCart);
        library.add(faSearch);
        library.add(faFilter);
        library.add(faExclamationTriangle);
        library.add(faUserFriends);
        library.add(faClipboardList);
        library.add(faCalendarMinus);
        library.add(faBuilding);
        library.add(faBookOpen);
        library.add(faGraduationCap);
        library.add(faChartLine);
        library.add(faCalendarWeek);
        library.add(faUsers);
        library.add(faSignInAlt);
        library.add(faPlus);
        library.add(faKey);
        library.add(faPencilAlt);
        library.add(faTrash);

        app.component('font-awesome-icon', FontAwesomeIcon);
    },
};