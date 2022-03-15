import {Auth} from 'aws-amplify';

export class IsAuthenticatedService {
    async run() {
        return Auth.currentAuthenticatedUser().then(user => user).catch(() => false);
    }
}