import {ParamsPaginationDto} from '../../../shared/dto/paramsPagination.dto';
import axios from '../../../shared/utils/axios';
import {services} from '../../../shared/constant/services';

interface IParams extends ParamsPaginationDto {
    status: string;
    dateSince: string;
    dateUntil: string;
    invoice: number;
    institutionIdClient: number;
}

export class GetQuotasWithPaginationService {
    run(params?: IParams) {
        return axios.get(`${services.casurid}/payments/invoices`, {
            params,
        }).then(response => response.data);
    }
}