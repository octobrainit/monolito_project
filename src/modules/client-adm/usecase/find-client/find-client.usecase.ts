import UseCaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import { FindAProductInputDto } from "../../../store-catalog/usecase/find-a-product/find-a-produc.dto";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientOutputDto } from "./find-client.usecase.dto";


export default class FindClientUsecase implements UseCaseInterface<FindAProductInputDto,FindClientOutputDto> {
    
    private _repository: ClientGateway;
    
    constructor(repository: ClientGateway) {
        this._repository = repository;
    }
    
    async execute(data: FindAProductInputDto): Promise<FindClientOutputDto> {
        
        const dbData = await this._repository.find(data.id);

        return {
            id: dbData.id.id,
            name: dbData.name,
            email: dbData.email,
            address: dbData.address,
            createdAt: dbData.createdAt,
            updatedAt: dbData.updatedAt
        };
    }

}