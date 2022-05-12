import axios from '../../../shared/utils/axios';
import {LicensesDto} from '../dtos/licenses.dto';
import {services} from '../../../shared/constant/services';

interface IPaymentRegisterService {
    invoice: {
        isCredit?: boolean;
        isQuote: boolean;
        totalPaid?: number;
        observations?: string;
    },
    quotes?: number | null;
    valueQuote?: number | null;
    payDay?: number | null;
}


export class PaymentRegisterService {
    async run(data: IPaymentRegisterService) {
        await axios.post<LicensesDto[]>(`${services.casurid}/payments/invoices`, data);
    }
}