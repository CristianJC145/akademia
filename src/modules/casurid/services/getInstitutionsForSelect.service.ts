import axios from '../../../shared/utils/axios';
import {ParamsPaginationDto} from '../../../shared/dto/paramsPagination.dto';
import {services} from '../../../shared/constant/services';

export class GetInstitutionsForSelectService {
    async run(params?: ParamsPaginationDto) {
        return axios.get(`${services.casurid}/clients/institutions-for-select`, {
            params,
        }).then((response) => response.data);
    }
}