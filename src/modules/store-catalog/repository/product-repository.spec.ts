import { Sequelize } from "sequelize-typescript";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import ProductRepository from "./product-repository";
import { ProductModel } from "./product.model";

describe('Product repository unit test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {
                force: true
            }
        });
        
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach( async () => {
        await sequelize.close();
    });

    it('should find all products', async () => {
        await ProductModel.create({
            id: '1234567',
            name: 'Product 1234567',
            description: 'Produc 1234567 description',
            salesPrice: 100
        });
        await ProductModel.create({
            id: '12345678',
            name: 'Product 12345678',
            description: 'Produc 12345678 description',
            salesPrice: 100
        });
        const productRepository = new ProductRepository();
        const result = await productRepository.findAll();

        expect(result.length).toBe(2);
        expect(result[0].id.id).toEqual('1234567');
        expect(result[0].name).toEqual('Product 1234567');
        expect(result[0].description).toEqual('Produc 1234567 description');
        expect(result[0].salesPrice).toEqual(100);

    })

    it('should find a product', async () => {
        await ProductModel.create({
            id: '12345679',
            name: 'Product 12345679',
            description: 'Produc 12345679 description',
            salesPrice: 100
        });
        await ProductModel.create({
            id: '12345678',
            name: 'Product 12345678',
            description: 'Produc 12345678 description',
            salesPrice: 100
        });
        const productRepository = new ProductRepository();
        const result = await productRepository.find('12345679');

        expect(result.id.id).toEqual('12345679');
        expect(result.name).toEqual('Product 12345679');
        expect(result.description).toEqual('Produc 12345679 description');
        expect(result.salesPrice).toEqual(100);

    })
})