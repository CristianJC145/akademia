import axios from '../../../shared/utils/axios';
import {services} from '../../../shared/constant/services';

export class GetShoppingCartService {
    async run(): Promise<any> {
        return axios.get(`${services.casurid}/catalogue/cart-products`).then((response) => response.data);
    }
}