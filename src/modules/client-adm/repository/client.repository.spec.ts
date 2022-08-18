import { Sequelize } from "sequelize-typescript"
import Client from "../domain/client.entity";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";

describe('client repository unit test', () => {
    let sequelize : Sequelize;

    beforeEach( async() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {
                force: true
            }
        });

        sequelize.addModels([ClientModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    });

    it('should add a client', async () => {
        const repository = new ClientRepository();
        const input = new Client({
            name: 'client',
            email: 'email@email.com',
            address: 'address 1'
        })
        
        await repository.add(input);

        const result = await ClientModel.findOne({where: { id : input.id.id}});

        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.address).toEqual(input.address);
        expect(result.updatedAt).toEqual(input.updatedAt);
        expect(result.createdAt).toEqual(input.createdAt);
    })

    it('should find a client', async () => {
        const repository = new ClientRepository();
        const client = new Client({
            name: 'client',
            email: 'email@email.com',
            address: 'address 1'
        })
        
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            updatedAt: client.updatedAt,
            createdAt: client.createdAt
        });

        const result = await repository.find(client.id.id);

        expect(result.id).toBeDefined();
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);
        expect(result.updatedAt).toEqual(client.updatedAt);
        expect(result.createdAt).toEqual(client.createdAt);
    })
})