import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Product from "../domain/product.entity";
import productEntity from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
    
    async findAll(): Promise<productEntity[]> {
        const data = await ProductModel.findAll();

        return data.map((item) => {
            return new Product({
                id: new Id(item.id),
                name: item.name,
                description: item.description,
                salesPrice: item.salesPrice
            });
        });
    }
    
    async find(id: string): Promise<productEntity> {
        const data = await ProductModel.findOne({where: {id: id}});
       
        return new Product({
            id: new Id(data.id),
            name: data.name,
            description: data.description,
            salesPrice: data.salesPrice
        })
    }

}