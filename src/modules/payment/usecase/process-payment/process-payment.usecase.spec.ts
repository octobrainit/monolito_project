import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUsecase from "./process-payment.usecase";

describe('Payment process usecase unit test', () => {

    it('should decline a transaction', async () => {
        const repository = () => {
            return {
                save: jest.fn().mockReturnValue(Promise.resolve(new Transaction({
                    id: new Id('123'),
                    amount: 99,
                    orderId: '1',
                    status: 'declined'
                })))
            };
        }
        const repo = repository();
        const usecase = new ProcessPaymentUsecase(repo);
        const input = {
            orderId: '1',
            amount: 99
        }
        const response = await usecase.execute(input);

        expect(repo.save).toHaveBeenCalled();
        expect(response.createdAt).toBeDefined();
        expect(response.updatedAt).toBeDefined();
        expect(response.status).toBe("declined");
        expect(response.transactionId).toEqual("123");
    })

    it('should make a transaction', async () => {
        const repository = () => {
            return {
                save: jest.fn().mockReturnValue(Promise.resolve(new Transaction({
                    id: new Id('123'),
                    amount: 100,
                    orderId: '1',
                    status: 'approved'
                })))
            };
        }
        const repo = repository();
        const usecase = new ProcessPaymentUsecase(repo);
        const input = {
                orderId: '1',
                amount: 100
            }
        const response = await usecase.execute(input);

        expect(repo.save).toHaveBeenCalled();
        expect(response.createdAt).toBeDefined();
        expect(response.updatedAt).toBeDefined();
        expect(response.status).toBe("approved");
        expect(response.transactionId).toEqual("123");
    })

    it('should make a wrong transaction with amount invalid', async () => {
        const repository = () => {
            return {
                save: jest.fn().mockReturnValue(Promise.resolve(new Transaction({
                    id: new Id('123'),
                    amount: 100,
                    orderId: '1',
                    status: 'declined'
                })))
            };
        }
        const repo = repository();
        const usecase = new ProcessPaymentUsecase(repo);
        const input = {
            orderId: '1',
            amount: -1
        }

        expect( async () => {
            const response = await usecase.execute(input);
        })
        .rejects
        .toThrow('amount must be greater than 0')
    })

})