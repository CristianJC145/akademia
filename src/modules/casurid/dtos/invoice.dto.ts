export interface InvoiceDto {
    institutionId: number;
    totalValue: number;
    totalDiscount: number;
    totalPurchase: number;
    isCredit?: number;
    observations: number;
    userId: number;
}