import axios from '../../../shared/utils/axios';
import {services} from '../../../shared/constant/services';
import {TokenService} from '../../../shared/services/token.service';
import {AuthenticatedUserService} from '../../../shared/services/authenticatedUser.service';
import {UserDto} from '../../../shared/dto/user.dto';
import {SignOutService} from '../../../shared/services/signOut.service';

interface ILogin {
    username: string;
    password: string;
}

interface ILoginDto {
    message: string;
    token: string;
    user: UserDto;
}

const tokenService = new TokenService();
const authenticatedUserService = new AuthenticatedUserService();
const signOutService = new SignOutService();

export class LoginService {
    constructor() {
    }

    async run(data: ILogin) {
        return axios.post<ILoginDto>(`${services.users}/access/users/login`, data).then((response) => {
            signOutService.run();
            tokenService.set(response.data.token);
            authenticatedUserService.set(response.data.user);
            return response;
        });
    }
}