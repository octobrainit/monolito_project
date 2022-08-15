import UseCaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsInputDto, FindAllProductsOutPutDto } from "./find-all-products.dto";

export default class FindAllProductsUsecase implements UseCaseInterface<FindAllProductsInputDto,FindAllProductsOutPutDto> {
    private _productsRepository: ProductGateway;

    constructor(productsrepository: ProductGateway) {
        this._productsRepository = productsrepository;
    }

    async execute(data: FindAllProductsInputDto): Promise<FindAllProductsOutPutDto> {
        const response = await this._productsRepository.findAll();
        const dataToResponse = response.map((item) => {
            return {
                id: item.id.id,
                name: item.name,
                description: item.description,
                salesPrice: item.salesPrice
            };
        });
        return { products: dataToResponse };
    }
}