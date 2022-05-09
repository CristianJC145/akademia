import axios from '../../../shared/utils/axios';
import {services} from '../../../shared/constant/services';

export class GetInstitutionByIdService {
    run(institutionId: string) {
        return axios.get(`${services.casurid}/clients/institutions/${institutionId}`)
            .then(response => response.data);
    }
}