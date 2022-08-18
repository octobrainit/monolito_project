export interface AddClientFacadeInputDto{
    id?: string;
    name: string;
    email: string;
    address: string;
}

export interface FindClientFacadeInputDto {
    id: string;
}

export interface FindClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date
}

export default interface ClientAdmFacadeInterface {
    addClient(client: AddClientFacadeInputDto) : Promise<void>;
    findClient(data: FindClientFacadeInputDto) : Promise<FindClientFacadeOutputDto>;
}
