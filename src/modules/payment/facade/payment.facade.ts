import { PaymentFacadeInterface, ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./payment.facade.interface";
import ProcessPaymentUsecase  from '../usecase/process-payment/process-payment.usecase';

type PaymentFacadeProps = {
    processPaymentUsecase: ProcessPaymentUsecase
}

export default class PaymentFacade implements PaymentFacadeInterface {
    private _processPayment: ProcessPaymentUsecase;
    
    constructor(props: PaymentFacadeProps) {        
        this._processPayment = props.processPaymentUsecase;
    }   
    
    async save(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        
        const response = await this._processPayment.execute({
            orderId: input.orderId,
            amount: input.amount
        });

        return {
            transactionId: response.transactionId,
            amount: response.amount,
            createdAt: response.createdAt,
            orderId: response.orderId,
            status: response.status,
            updatedAt: response.updatedAt
        }
    }

}