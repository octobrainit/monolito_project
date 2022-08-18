import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientAdmFacadeFactory from "../factory/facade.factory";
describe('Client adm facade unit test', () => {
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
        sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => { await sequelize.close(); })

    it('should add a client', async () => {
        const facade = ClientAdmFacadeFactory.createFacate();
        const input = {
            id: '123',
            name: 'zé',
            email: 'email@email.com',
            address: 'rua zé'
        }

        await facade.addClient(input);

        const result = await ClientModel.findOne({where: {id: input.id}});

        expect(result.id).toEqual(input.id);
        expect(result.email).toEqual(input.email);
        expect(result.address).toEqual(input.address);
        expect(result.name).toEqual(input.name);

    })

    it('should find a client', async () => {
        const facade = ClientAdmFacadeFactory.createFacate();
        const input = {
            id: '1234',
            name: 'zé',
            email: 'email@email.com',
            address: 'rua zé'
        }

        await facade.addClient(input);

        const result = await facade.findClient({id: input.id});

        expect(result.id).toEqual(input.id);
        expect(result.email).toEqual(input.email);
        expect(result.address).toEqual(input.address);
        expect(result.name).toEqual(input.name);

    })
})