import axios from 'axios';
import {TokenService} from '../services/token.service';
import {ErrorAlertService} from '../services/errorAlert.service';
import {ToastService} from '../services/toast.service';

const getTokenService = new TokenService();
const errorAlertService = new ErrorAlertService();
const toastService = new ToastService();

axios.interceptors.request.use(async (config) => {
    const token = await getTokenService.get();

    if (!config.headers) {
        config.headers = {};
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    /* ErrorAlert */
    errorAlertService.hide();
    toastService.hide();

    return config;
});

axios.interceptors.response.use((response) => {
    if (response && response.data && response.data.message) {
        toastService.show(response.data.message);
    }
    return response;
}, (error) => {
    /* ErrorAlert */
    const response = error.response;

    if (response && response.data) {
        const data = response.data;

        if (data.message) {
            toastService.show(data.message, 'error');
        }

        if (data.message || data.errors) {
            errorAlertService.show(data.message, data.errors ?? []);
        }
    }

    return Promise.reject(error);
});

export default axios;