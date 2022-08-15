import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Product from "../domain/product.entity";
import productEntity from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway.interface";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {

    async add(product: productEntity): Promise<void> {
        try {
            await ProductModel.create({
                id: product.id.id,
                name: product.name,
                description: product.description,
                purchasePrice: product.purchasePrice,
                stock: product.stock,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            });
            return;
        } catch (error) {
            console.log(error);
        }
    }
    
    async find(id: string): Promise<productEntity> {
        const result = await ProductModel.findOne({where: {id: id}});

        if(!result)
            throw new Error(`Product with Id ${id} not found`);

        const productProps = {
            id: new Id(result.id),
            name: result.name,
            description: result.description,
            purchasePrice: result.purchasePrice,
            stock: result.stock,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        };

        return new Product(productProps);
    }
    
    
}