import {UserDto} from '../dto/user.dto';

export class AuthenticatedUserService {
    private key = 'user';

    get(): UserDto | null {
        const user = localStorage.getItem(this.key);

        if (user) {
            return JSON.parse(user);
        }

        return null;
    }

    set(user: any): void {
        localStorage.setItem(this.key, JSON.stringify(user));
    }
}