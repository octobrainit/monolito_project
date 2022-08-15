import StoreCatelogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product-repository";
import FindAProductUseCase from "../usecase/find-a-product/find-a-product-usecase";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";



export default class StoreCatalogFacadeFactory {
    
    static create(): StoreCatelogFacade {
        const repository = new ProductRepository();
        const findAProductUseCase = new FindAProductUseCase(repository);
        const findAllProductsUsecase = new FindAllProductsUsecase(repository);
        
        return new StoreCatelogFacade({
            find: findAProductUseCase,
            findAll: findAllProductsUsecase 
        });
    }
}