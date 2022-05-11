import axios from '../../../shared/utils/axios';
import {services} from '../../../shared/constant/services';

interface IAddPaymentFromAdminService {
    invoice: {
        id: number;
        totalPaid: number;
        isCredit: number;
    };
    quotes?: number;
    valueQuote?: number;
    payDay?: number;
}

export class AddPaymentFromAdminService {
    async run(data: IAddPaymentFromAdminService) {
        await axios.post(`${services.casurid}/payments/admin/invoices`, data);
    }
}