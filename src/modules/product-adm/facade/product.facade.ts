import UseCaseInterface from "../../@shared/domain/usecase/usecase.interface";
import { AddProductInputDto, AddProductOutputDto } from "../usecase/add-product/add.product.dto";
import { CheckStockInputDto } from "../usecase/check-stock/checkstock.dto";
import ProducAdmFacadeInterface, { AddProducFacadeInputDto, CheckProducFacadeInputDto, CheckProducFacadeOutputDto } from "./product.facade.interface";

export interface ProductFacadeProps {
    addProductUseCase: UseCaseInterface<AddProductInputDto,AddProductOutputDto>;
    checkStockProductUseCase: UseCaseInterface<CheckStockInputDto, CheckProducFacadeOutputDto>;
}

export default class ProductFacade implements ProducAdmFacadeInterface {
    
    private _addProductUseCase: UseCaseInterface<AddProductInputDto,AddProductOutputDto>;
    private _checkStockProductUseCase: UseCaseInterface<CheckStockInputDto, CheckProducFacadeOutputDto>;

    constructor(props: ProductFacadeProps) {
        this._addProductUseCase = props.addProductUseCase;
        this._checkStockProductUseCase = props.checkStockProductUseCase;
    }
    
    async addProduct(product: AddProducFacadeInputDto): Promise<void> {
        const item = {
            id: product.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock
        } as AddProductInputDto;

        await this._addProductUseCase.execute(item);
        
        return; 
    }
    
    async CheckStock(product: CheckProducFacadeInputDto): Promise<CheckProducFacadeOutputDto> {
        const response = await this._checkStockProductUseCase.execute({productId: product.id});
        
        return {
            productId: response.productId,
            stock: response.stock
        } as CheckProducFacadeOutputDto
    }
    
}