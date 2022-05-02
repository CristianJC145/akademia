import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {GetInitDataService} from '../services/getInitData.service';
import {ItemMenuType} from '../types/itemMenu.type';
import {IsAuthenticatedService} from '../services/isAuthenticated.service';
import {InstitutionsService} from '../services/institutions.service';
import {AuthenticatedUserService} from '../services/authenticatedUser.service';
import i18n from '../plugins/i18n.plugin';
import {GetTranslationsByLanguageService} from '../services/getTranslationsByLanguage.service';
import {NavigationService} from '../services/navigation.service';

const getInitDataService = new GetInitDataService();
const isAuthenticatedService = new IsAuthenticatedService();
const institutionsService = new InstitutionsService();
const authenticatedUserService = new AuthenticatedUserService();
const getTranslationsByLanguageService = new GetTranslationsByLanguageService();
const navigationService = new NavigationService();

function convertRouteToNavigation(route: string): { route: string | null; externalLink: boolean } {
    if (!route) {
        return {
            route: null,
            externalLink: false,
        };
    }

    if (!validURL(route)) {
        return {
            route: route,
            externalLink: false,
        };
    }

    const host = window.location.origin;
    let newRoute = route;
    let externalLink = true;

    if (route.includes(host)) {
        newRoute = route.replace(host, '');
        externalLink = false;
    }

    return {
        route: newRoute,
        externalLink,
    };
}

function validURL(str: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

async function initDataResolver(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    // Agregando traducciones
    const language = 'es';

    const messages = await getTranslationsByLanguageService.run(language);

    i18n.global.setLocaleMessage(language, messages);

    const isAuth = isAuthenticatedService.run();

    if (!isAuth) {
        return next();
    }

    const {
        items,
        userInstitutions,
        user,
    } = await getInitDataService.run();

    authenticatedUserService.set(user);

    //Agregando los items para el menu

    const itemsMenu: ItemMenuType[] = [];

    items.forEach(item => {
        const children: ItemMenuType[] = [];

        item.children.forEach(itemChild => {
            if (itemChild.showMenu) {
                const convertRouteChild = convertRouteToNavigation(itemChild.route);
                children.push({
                    id: itemChild.id.toString(),
                    title: itemChild.name,
                    icon: itemChild.icon,
                    link: convertRouteChild.route,
                    externalLink: convertRouteChild.externalLink,
                });
            }

        });

        if (item.showMenu) {
            const convertRoute = convertRouteToNavigation(item.route);

            itemsMenu.push({
                id: item.id.toString(),
                title: item.name,
                icon: item.icon,
                link: convertRoute.route,
                externalLink: convertRoute.externalLink,
                children,
            });
        }
    });

    navigationService.set(itemsMenu);

    // Agregando las Instituciones
    const institutions = userInstitutions.map((userInstitution) => userInstitution.institution);

    institutionsService.setInstitutions(institutions);

    institutionsService.setDefaultSelectedInstitution();

    return next();
}

export {
    initDataResolver,
};