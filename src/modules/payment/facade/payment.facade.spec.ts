import { Sequelize } from "sequelize-typescript";
import PaymentFacadeFactory from "../factory/facade.factory";
import PaymentModel from "../repository/payment.model";

describe('Process payment facade test', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {
                force: true
            }
        });
        sequelize.addModels([PaymentModel]);
        await sequelize.sync();
    });

    afterEach(async () => { await sequelize.close(); })

    it('should create a transaction', async () => {
        const facade = PaymentFacadeFactory.create();

        const response = await facade.save({orderId: 'q123', amount: 100});

        expect(response.transactionId).toBeDefined();
        expect(response.amount).toBe(100);
        expect(response.orderId).toBe('q123');
        expect(response.status).toBe('approved');
        expect(response.updatedAt).toBeDefined();
        expect(response.createdAt).toBeDefined();
    })

})