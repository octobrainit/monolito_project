import FindAProductUseCase from "../usecase/find-a-product/find-a-product-usecase";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import { StoreCatalogFacadeFindAllOutPutDto, StoreCatalogFacadeFindOutPutDto, StoreCatalogFacadeInputDto, StoreCatalogFacadeInterface } from "./store-catalog.facade.interface";

type StoreCatalogFacadeProps = {
    find: FindAProductUseCase, 
    findAll: FindAllProductsUsecase
}

export default class StoreCatelogFacade implements StoreCatalogFacadeInterface {
    
    private _findAll: FindAllProductsUsecase;
    private _find: FindAProductUseCase;
    
    constructor(props: StoreCatalogFacadeProps) {
        this._find = props.find;
        this._findAll = props.findAll; 
    }

    async find(data: StoreCatalogFacadeInputDto): Promise<StoreCatalogFacadeFindOutPutDto> {
        return await this._find.execute(data);
    }
    async findAll(): Promise<StoreCatalogFacadeFindAllOutPutDto> {
        return await this._findAll.execute({});
    }

}