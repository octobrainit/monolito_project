import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase implements UseCaseInterface<AddClientInputDto,AddClientOutputDto> {
    private _repository: ClientGateway;
    
    constructor(repository: ClientGateway) {
        this._repository = repository;
    }
    
    async execute(data: AddClientInputDto): Promise<AddClientOutputDto> {
        const client = new Client({
            id: new Id(data.id),
            name: data.name,
            email: data.email,
            address: data.address
        });
        
        await this._repository.add(client);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        };
    }

}