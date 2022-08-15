import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway.interface";
import { AddProductInputDto, AddProductOutputDto } from "./add.product.dto";

export default class AddProductUseCase implements UseCaseInterface<AddProductInputDto,AddProductOutputDto> {
    private _productGateway: ProductGateway;

    constructor(productGateway: ProductGateway) {
        this._productGateway = productGateway;
    }
    
    async execute(input: AddProductInputDto) : Promise<AddProductOutputDto> {
        const props = {
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        };
        const product = new Product(props);

        await this._productGateway.add(product);

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        } as AddProductOutputDto;
    }
}