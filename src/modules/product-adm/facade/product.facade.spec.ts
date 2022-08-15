import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import { ProductModel } from "../repository/product.model";
import { AddProducFacadeInputDto } from "./product.facade.interface";

describe('product adm Facade test', () => {
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

    it('should create a product by facade', async () => {
        const productfacade = ProductAdmFacadeFactory.create();
        const productInput = {
            id: "12",
            description: 'Product description 1',
            name: 'product name 1',
            purchasePrice: 100,
            stock:10
        } as AddProducFacadeInputDto;

        await productfacade.addProduct(productInput);
        
        const product = await ProductModel.findOne({where : { id: productInput.id }});

        expect(product).toBeDefined();
        expect(product.name).toEqual(productInput.name);
        expect(product.description).toEqual(productInput.description);
        expect(product.purchasePrice).toEqual(productInput.purchasePrice);
        expect(product.stock).toEqual(productInput.stock);
        expect(true).toBe(true);
    });

    it('should check stock by facade', async () => {
        const productfacade = ProductAdmFacadeFactory.create();
        const productInput = {
            id: "12",
            description: 'Product description 1',
            name: 'product name 1',
            purchasePrice: 100,
            stock:10
        } as AddProducFacadeInputDto;

        await productfacade.addProduct(productInput);
        
        const product = await productfacade.CheckStock({ id: productInput.id });

        expect(product).toBeDefined();
        expect(product.productId).toEqual(productInput.id);
        expect(product.stock).toEqual(productInput.stock);
    });
})