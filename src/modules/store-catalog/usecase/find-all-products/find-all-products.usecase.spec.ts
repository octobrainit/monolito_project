import Id from "../../../@shared/domain/entity/value-object/id.value-object"
import Product from "../../domain/product.entity"
import FindAllProductsUsecase from "./find-all-products.usecase";

const product = new Product({
    id: new Id("12345"),
    name: 'Product 12345',
    description: 'Product description 12345',
    salesPrice: 100
});
const product2 = new Product({
    id: new Id("123456"),
    name: 'Product 123456',
    description: 'Product description 123456',
    salesPrice: 100
});
const mockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([product,product2])),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
};

describe('Find all products usecase unit test',() => {

    it('should retrieve all products', async () => {
        const productRepository = mockRepository();
        const usecase = new FindAllProductsUsecase(productRepository);

        const result = await usecase.execute({});

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(product.id.id);
        expect(result.products[0].name).toBe(product.name);
        expect(result.products[0].description).toBe(product.description);
        expect(result.products[0].salesPrice).toBe(product.salesPrice);
    })

})