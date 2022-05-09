import {TimestampDto} from '../../../shared/dto/timestamp.dto';

export interface DetailSaleDto extends TimestampDto{
    id: number;
    description?: any;
    invoiceId: number;
    productId: number;
    productValueId?: any;
    quantity: number;
    unitValue: number;
    percentDiscount?: number;
    totalValue: number;
    productName?: string;
    validityPeriod?: number;
}