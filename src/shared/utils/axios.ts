import axios from 'axios';
import {TokenService} from '../services/token.service';
import {ErrorAlertService} from '../services/errorAlert.service';
import {ToastService} from '../services/toast.service';
import {InstitutionsService} from '../services/institutions.service';
import {ButtonLoadingService} from '../services/buttonLoading.service';
import {services} from '../constant/services';
import {TokenLtiService} from '../services/tokenLti.service';

const getTokenService = new TokenService();
const tokenLtiService = new TokenLtiService();
const errorAlertService = new ErrorAlertService();
const toastService = new ToastService();
const institutionsService = new InstitutionsService();
const buttonLoadingService = new ButtonLoadingService();

axios.interceptors.request.use(async (config) => {


    if (!config.headers) {
        config.headers = {};
    }

    // Agregando Token
    const auxUrl = config.url;
    const urlSearch = services.ltiProvider as string;
    if (auxUrl && auxUrl.indexOf(urlSearch) >= 0) {
        const token = await tokenLtiService.get();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } else {
        const token = await getTokenService.get();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    // Agregando la Institucion
    const institution = institutionsService.getSelectedInstitution();
    if (institution) {
        config.headers.institution_id = institution.id.toString();
    }

    /* ErrorAlert */
    errorAlertService.hide();
    toastService.hide();

    buttonLoadingService.isSaving(true);

    return config;
});

axios.interceptors.response.use((response) => {
    if (response && response.data && response.data.message) {
        toastService.show(response.data.message);
    }
    buttonLoadingService.isSaving(false);
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
    buttonLoadingService.isSaving(false);
    return Promise.reject(error);
});

export default axios;