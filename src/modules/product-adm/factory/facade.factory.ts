import ProductFacade from "../facade/product.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add.product.usecase";
import CheckStockUseCase from "../usecase/check-stock/checkstock.usecase";

export default class ProductAdmFacadeFactory {
    static create(): ProductFacade {
        const repository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(repository);
        const checkstockUseCase = new CheckStockUseCase(repository);
        
        return new ProductFacade({
            addProductUseCase: addProductUseCase,
            checkStockProductUseCase: checkstockUseCase 
        });
    }
}