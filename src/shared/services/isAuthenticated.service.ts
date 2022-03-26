export class IsAuthenticatedService {
    async run() {
        return false;
        // return Auth.currentAuthenticatedUser().then(user => user).catch(() => false);
    }
}