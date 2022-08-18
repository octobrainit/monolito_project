import Id from "../../../@shared/domain/entity/value-object/id.value-object"
import FindClientUsecase from "./find-client.usecase"

const client = {
    id: new Id('1'),
    name: 'client name',
    email: 'email@email.com',
    address: 'address 1',
    createdAt: Date.now(),
    updatedAt: Date.now()
}

const mockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
        add: jest.fn()
    }
}

describe('Find client unit test', () => {
    it('should find a client', async () => {
        const repository = mockRepository();
        const usecase = new FindClientUsecase(repository);

        var response = await usecase.execute({ id: '1'});

        expect(repository.find).toHaveBeenCalled();
        expect(response.id).toEqual(client.id.id);
        expect(response.name).toEqual(client.name);
        expect(response.email).toEqual(client.email);
        expect(response.address).toEqual(client.address);
    })
})