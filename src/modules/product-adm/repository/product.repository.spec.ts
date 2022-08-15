import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Product from "../domain/product.entity";
import { ProductModel } from "./product.model";
import ProductRepository from "./product.repository";

describe('Product repository test', () => {
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

    it('should create a product', async () => {
        const productProps = {
            id: new Id('1'),
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const product = new Product(productProps);
        const productRepository = new ProductRepository();
        await productRepository.add(product);
        
        const poductCreated = await ProductModel.findOne({where: { id: productProps.id.id}});

        expect(poductCreated.id).toEqual(product.id.id);
        expect(poductCreated.name).toEqual(product.name);
        expect(poductCreated.description).toEqual(product.description);
        expect(poductCreated.purchasePrice).toEqual(product.purchasePrice);
        expect(poductCreated.stock).toEqual(product.stock);
        expect(poductCreated.createdAt).toEqual(product.createdAt);
        expect(poductCreated.updatedAt).toEqual(product.updatedAt);
    })

    it('should find a product', async () => {
        const productProps = {
            id: new Id('1'),
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const product = new Product(productProps);
        
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        });

        const productRepository = new ProductRepository();

        const result = await productRepository.find(product.id.id);

        expect(result.id.id).toEqual(product.id.id);
        expect(result.name).toEqual(product.name);
        expect(result.description).toEqual(product.description);
        expect(result.purchasePrice).toEqual(product.purchasePrice);
        expect(result.stock).toEqual(product.stock);
        expect(result.createdAt).toEqual(product.createdAt);
        expect(result.updatedAt).toEqual(product.updatedAt);
    })
})