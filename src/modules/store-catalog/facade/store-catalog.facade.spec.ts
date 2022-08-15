import { Sequelize } from "sequelize-typescript";
import StoreCatalogFacadeFactory from "../factory/store-catalog.facade-factory";
import { ProductModel } from "../repository/product.model";

describe('store-catalog facade unit test', () => {
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

    afterEach(async () => { await sequelize.close(); })

    it('should find all products', async () => {
        const facade = StoreCatalogFacadeFactory.create();

        await ProductModel.create({
            id: '15',
            name: 'Product 15',
            description: 'Product 15 description',
            salesPrice: 100
        });
        
        const result = await facade.findAll();

        expect(result.products.length).toBe(1);
        expect(result.products[0].id).toBe('15');
        expect(result.products[0].description).toBe('Product 15 description');
        expect(result.products[0].name).toBe('Product 15');
        expect(result.products[0].salesPrice).toBe(100);


    });

    it('should find a product', async () => {
        const facade = StoreCatalogFacadeFactory.create();

        await ProductModel.create({
            id: '15',
            name: 'Product 15',
            description: 'Product 15 description',
            salesPrice: 100
        });
        
        const result = await facade.find({id: '15'});

        expect(result.id).toBe('15');
        expect(result.description).toBe('Product 15 description');
        expect(result.name).toBe('Product 15');
        expect(result.salesPrice).toBe(100);
    })
});