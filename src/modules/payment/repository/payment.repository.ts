import transaction from "../domain/transaction";
import PaymentGateway from "../gateway/payment.gateway";
import PaymentModel from "./payment.model";

export default class PaymentRepository implements PaymentGateway {
    
    async save(input: transaction): Promise<transaction> {
        await PaymentModel.create({
            id: input.id.id,
            status: input.status,
            amount: input.amount,
            orderId: input.orderId,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        });

        return input;
    }

}