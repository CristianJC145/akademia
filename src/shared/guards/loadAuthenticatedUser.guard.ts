import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {IsAuthenticatedService} from '../services/isAuthenticated.service';
import {AuthenticatedUserService} from '../services/authenticatedUser.service';

const isAuthenticated = new IsAuthenticatedService();
const authenticatedUserService = new AuthenticatedUserService();

export async function loadAuthenticatedUserGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const isAuth = isAuthenticated.run();

    if (isAuth) {
        authenticatedUserService.setOnStore();
    }

    return next();
}