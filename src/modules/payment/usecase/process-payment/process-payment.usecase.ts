import UseCaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUsecase implements UseCaseInterface<ProcessPaymentInputDto, ProcessPaymentOutputDto> {
    private repository: PaymentGateway;
    
    constructor(paymentRepository: PaymentGateway) {
        this.repository = paymentRepository;
    }    
    
    async execute(data: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        
        const transaction = new Transaction({
            amount: data.amount,
            orderId: data.orderId
        });

        transaction.process();

        const transactionDB = await this.repository.save(transaction);

        return {
            amount: transactionDB.amount,
            createdAt: transactionDB.createdAt,
            orderId: transactionDB.orderId,
            status: transactionDB.status,
            transactionId: transactionDB.id.id,
            updatedAt: transactionDB.updatedAt
        };
    }

}