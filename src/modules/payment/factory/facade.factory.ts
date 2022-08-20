import PaymentFacade from "../facade/payment.facade";
import PaymentRepository from "../repository/payment.repository";
import ProcessPaymentUsecase from "../usecase/process-payment/process-payment.usecase";


export default class PaymentFacadeFactory {
    static create() : PaymentFacade {
        const repository = new PaymentRepository();
        const processPaymentUsecase = new ProcessPaymentUsecase(repository);
        const facadeProps = {
            processPaymentUsecase: processPaymentUsecase
        };

        return new PaymentFacade(facadeProps);
    }
}