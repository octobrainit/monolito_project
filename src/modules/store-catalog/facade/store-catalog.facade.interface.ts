export interface StoreCatalogFacadeInputDto{
    id: string;
}
export interface StoreCatalogFacadeFindOutPutDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}
export interface StoreCatalogFacadeFindAllOutPutDto {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[]
}

export interface StoreCatalogFacadeInterface {
    find(data: StoreCatalogFacadeInputDto): Promise<StoreCatalogFacadeFindOutPutDto>;
    findAll() : Promise<StoreCatalogFacadeFindAllOutPutDto>
}