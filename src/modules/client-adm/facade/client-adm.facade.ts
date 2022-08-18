import { StoreCatalogFacadeFindOutPutDto } from "../../store-catalog/facade/store-catalog.facade.interface";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

type ClientAdmProps = {
    add: AddClientUseCase,
    find: FindClientUsecase
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private _addClientUsecase: AddClientUseCase;
    private _findClientUsecase: FindClientUsecase;
    
    constructor(props: ClientAdmProps) {
        this._addClientUsecase = props.add;
        this._findClientUsecase = props.find;
    }
    
    async addClient(client: AddClientFacadeInputDto): Promise<void> {
        await this._addClientUsecase.execute({
            id: client.id,
            name: client.name,
            address: client.address,
            email: client.email
        });
        return;
    }

    async findClient(data: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        const response = await this._findClientUsecase.execute({ id: data.id});

        return {
            id: response.id,
            name: response.name,
            email: response.email,
            address: response.address,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt
        };
    }

}