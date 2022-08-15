import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import Product from "../../domain/product.entity";
import { CheckStockInputDto } from "./checkstock.dto";
import CheckStockUseCase from "./checkstock.usecase";

const product = new Product({
    id: new Id("123"),
    description: 'Product Test 1',
    name:'Product test',
    purchasePrice: 100,
    stock: 10,
    
})


describe('Check stock usecase unit test', () => {
    const mockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(product))
        }
    }

    it('should find a product', async () => {
        const productRepository = mockRepository();
        const usecase = new CheckStockUseCase(productRepository);
        const input = { productId: "123" };

        const response = await usecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(response.productId).toEqual(product.id.id);
        expect(response.stock).toEqual(product.stock);
    })

})