export interface ProcessPaymentInputDto {
    orderId: string;
    amount: number;
}

export interface ProcessPaymentOutputDto {
    transactionId: string;
    orderId: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    status: string;
}

export interface PaymentFacadeInterface {
    save(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto>;
}