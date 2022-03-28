import axios from '../../../shared/utils/axios';
import {services} from '../../../shared/constant/services';
import {TokenService} from '../../../shared/services/token.service';

interface ILogin {
    username: string;
    password: string;
}

export class LoginService {
    constructor(
        private tokenService = new TokenService(),
    ) {
    }

    async run(data: ILogin) {
        return axios.post(`${services.users}/access/users/login`, data).then((response) => {
            // localStorage.setItem('token', response.data.token);
            this.tokenService.set(response.data.token);
            return response;
        });
    }
}