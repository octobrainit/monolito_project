import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
    static createFacate(): ClientAdmFacade {
        const repository = new ClientRepository();
        const addusecase = new AddClientUseCase(repository);
        const findusecase = new FindClientUsecase(repository);

        return new ClientAdmFacade({ add: addusecase, find: findusecase});
    }
}