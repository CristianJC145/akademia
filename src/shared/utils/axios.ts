import axios from 'axios';
import {GetTokenService} from '../services/getToken.service';

const getTokenService = new GetTokenService();

axios.interceptors.request.use(async (config) => {
    const token = await getTokenService.run();

    if (!config.headers) {
        config.headers = {};
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axios;