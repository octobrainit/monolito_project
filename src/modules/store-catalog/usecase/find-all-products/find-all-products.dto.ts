export interface FindAllProductsOutPutDto {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number
    }[];
}

export interface FindAllProductsInputDto {
        name?: string;
}