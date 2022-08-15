import UseCaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindAProductInputDto, FindAProductOutPutDto } from "./find-a-produc.dto";

export default class FindAProductUseCase implements UseCaseInterface<FindAProductInputDto, FindAProductOutPutDto> {
    private _repository: ProductGateway;
    
    constructor(repository: ProductGateway) {
        this._repository = repository;
    }
    
    async execute(data: FindAProductInputDto): Promise<FindAProductOutPutDto> {
        const result = await this._repository.find(data.id);

        return {
            id: result.id.id,
            name: result.name,
            description: result.description,
            salesPrice: result.salesPrice
        } as FindAProductOutPutDto;
    }
}