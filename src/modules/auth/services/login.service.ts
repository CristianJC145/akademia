import axios from '../../../shared/utils/axios';
import {services} from '../../../shared/constant/services';
import {TokenService} from '../../../shared/services/token.service';
import {AuthenticatedUserService} from '../../../shared/services/authenticatedUser.service';
import {UserDto} from '../../../shared/dto/user.dto';
import {AxiosResponse} from 'axios';

interface ILogin {
    username: string;
    password: string;
}

interface ILoginDto {
    message: string;
    token: string;
    user: UserDto;
}

export class LoginService {
    constructor(
        private tokenService = new TokenService(),
        private authenticatedUserService = new AuthenticatedUserService(),
    ) {
    }

    async run(data: ILogin) {
        return axios.post<ILoginDto>(`${services.users}/access/users/login`, data).then((response) => {
            // localStorage.setItem('token', response.data.token);
            this.tokenService.set(response.data.token);
            this.authenticatedUserService.set(response.data.user);
            return response;
        });
    }
}