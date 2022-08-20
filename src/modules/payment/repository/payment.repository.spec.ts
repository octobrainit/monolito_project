import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Transaction from "../domain/transaction";
import PaymentModel from "./payment.model"
import PaymentRepository from "./payment.repository";

describe('Payment repository unit test', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {
                force: true
            }
        })
        sequelize.addModels([PaymentModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it('should create a transaction', async () => {
        const transaction = new Transaction({
            id: new Id('1234'),
            amount: 100,
            orderId: '1'
        });
        transaction.process();

        const repository = new PaymentRepository();
        
        await repository.save(transaction);
        
        const result = await PaymentModel.findOne({where: {id: transaction.id.id}});
        
        expect(result.id).toBeDefined();
        expect(result.amount).toEqual(transaction.amount);
        expect(result.status).toEqual(transaction.status);
        expect(result.orderId).toEqual(transaction.orderId);
    })

})
