import AddProductUseCase from "./add.product.usecase";


describe('add product usecase unit test',() => {

    const mockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn(),
        };
    }

    it('should add a product', async () => {
        const productRepository = mockRepository();
        const usecase = new AddProductUseCase(productRepository);
        const input = {
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 100,
            stock: 10
        }

        const response = await usecase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(response.id).toBeDefined();
        expect(response.name).toBe(input.name);
        expect(response.description).toBe(input.description);
        expect(response.purchasePrice).toBe(input.purchasePrice);
        expect(response.stock).toBe(input.stock);
    });

});