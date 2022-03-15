import {Auth} from 'aws-amplify';

export class GetTokenService {
    async run(): Promise<string | boolean> {
        return Auth.currentSession().then((user) => {
            return user.getIdToken().getJwtToken();
        }).catch(() => {
            return false;
        });
    }
}