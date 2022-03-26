import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {GetInitDataService} from '../services/getInitData.service';
import {ItemMenuType} from '../types/itemMenu.type';
import {IsAuthenticatedService} from '../services/isAuthenticated.service';

const getInitDataService = new GetInitDataService();
const isAuthenticatedService = new IsAuthenticatedService();

function convertRouteToNavigation(route: string): { route: string | null; externalLink: boolean } {
    if (!route) {
        return {
            route: null,
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

async function initDataResolver(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const isAuth = !isAuthenticatedService.run();

    if (!isAuth) {
        return next();
    }

    const {
        items,
    } = await getInitDataService.run();

    const itemsMenu: ItemMenuType[] = [];

    items.forEach(item => {
        const children: ItemMenuType[] = [];

        item.children.forEach(itemChild => {

            if (itemChild.showMenu) {
                const convertRouteChild = convertRouteToNavigation(itemChild.route);
                children.push({
                    id: itemChild.id.toString(),
                    title: itemChild.name,
                    // type: 'basic',
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
                // type: children.length ? 'group' : 'basic',
                icon: item.icon,
                link: convertRoute.route,
                externalLink: convertRoute.externalLink,
                children,
            });
        }
    });

    return next();
}

export {
    initDataResolver,
};