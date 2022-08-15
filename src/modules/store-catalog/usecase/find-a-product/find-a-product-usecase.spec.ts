import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAProductUseCase from "./find-a-product-usecase";

const product = new Product({
    id: new Id("12345"),
    name: 'Product 12345',
    description: 'Product description 12345',
    salesPrice: 100
});

const mockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([product])),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
};

describe('find a product usecase unit test ', () => {

    it('should find a product', async () => {
        const repository = mockRepository();
        const usecase = new FindAProductUseCase(repository);

        const result = await usecase.execute({id: '12345'});

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toEqual(product.id.id);
        expect(result.name).toEqual(product.name);
        expect(result.description).toEqual(product.description);
        expect(result.salesPrice).toEqual(product.salesPrice);
    })

});