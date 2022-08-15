export interface AddProducFacadeInputDto {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}
export interface CheckProducFacadeInputDto {
    id: string;
}
export interface CheckProducFacadeOutputDto {
    productId: string;
    stock: number;
}

export default interface ProducAdmFacadeInterface {
    addProduct(product: AddProducFacadeInputDto) : Promise<void>;
    CheckStock(product: CheckProducFacadeInputDto) : Promise<CheckProducFacadeOutputDto>;
}