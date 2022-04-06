import axios from 'axios';
import {TokenService} from '../services/token.service';

const getTokenService = new TokenService();

axios.interceptors.request.use(async (config) => {
    const token = await getTokenService.get();

    if (!config.headers) {
        config.headers = {};
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axios;