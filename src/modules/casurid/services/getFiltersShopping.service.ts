import axios from '../../../shared/utils/axios';
import {services} from '../../../shared/constant/services';

export class GetFiltersShoppingService {
    run() {
        return axios.get<any>(`${services.casurid}/purchases/related-data-csd-curriculum-products`).then((response) => {
            return response.data;
        });
    }
}