import axios from '../../../shared/utils/axios';
import {services} from '../../../shared/constant/services';

interface ILogin {
    username: string;
    password: string;
}

export class LoginService {
    async run(data: ILogin) {
        return axios.post(`${services.users}/access/users/login`, data).then((response) => {
            localStorage.setItem('token', response.data.token);

            return response;
        });
    }
}