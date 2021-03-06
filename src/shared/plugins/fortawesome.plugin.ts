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
    faWindowClose,
    faPoll,
    faUser,
    faFileMedical,
    faHouseUser,
    faSchool,
    faArrowCircleUp,
    faCalendar,
    faTasks,
    faAddressCard,
    faBan,
    faLayerGroup,
    faChartBar,
    faShoppingBag,
    faExclamationCircle,
    faTable,
    faTags,
    faReceipt,
    faUniversity,
    faDollarSign,
    faUserCog,
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
        library.add(faWindowClose);
        library.add(faPoll);
        library.add(faUser);
        library.add(faFileMedical);
        library.add(faHouseUser);
        library.add(faSchool);
        library.add(faArrowCircleUp);
        library.add(faCalendar);
        library.add(faTasks);
        library.add(faAddressCard);
        library.add(faBan);
        library.add(faLayerGroup);
        library.add(faChartBar);
        library.add(faShoppingBag);
        library.add(faExclamationCircle);
        library.add(faTable);
        library.add(faTags);
        library.add(faReceipt);
        library.add(faUniversity);
        library.add(faDollarSign);
        library.add(faUserCog);

        app.component('font-awesome-icon', FontAwesomeIcon);
    },
};