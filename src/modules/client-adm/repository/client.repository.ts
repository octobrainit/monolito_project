import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import ClientModel from "./client.model";

export default class ClientRepository implements ClientGateway {
    
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            updatedAt: client.updatedAt,
            createdAt: client.createdAt
        });
    }
    
    async find(id: string): Promise<Client> {
        const result = await ClientModel.findOne({where: { id: id }});

        return {
            id: new Id(result.id),
            name: result.name,
            email: result.email,
            address: result.address,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        } as Client;
    }

}