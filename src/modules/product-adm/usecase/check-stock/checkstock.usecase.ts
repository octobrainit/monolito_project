import UseCaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import { CheckStockInputDto, CheckStockOutputDto } from "./checkstock.dto";
import ProductGateway from "../../gateway/product.gateway.interface";

export default class CheckStockUseCase implements UseCaseInterface<CheckStockInputDto, CheckStockOutputDto> {
    private _productGateway: ProductGateway;
    
    constructor(productGateway: ProductGateway) {
        this._productGateway = productGateway;
    }

    async execute(data: CheckStockInputDto): Promise<CheckStockOutputDto> {
        const response = await this._productGateway.find(data.productId);

        return {
            productId: response.id.id,
            stock: response.stock
        } as CheckStockOutputDto;
    }
    
}