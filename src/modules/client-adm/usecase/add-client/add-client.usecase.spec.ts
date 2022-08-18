import AddClientUseCase from "./add-client.usecase";

const mockRepository = () =>{
    return {
        add: jest.fn(),
        find: jest.fn()
    };
};

describe('Add client usecase unit test', () => {
    
    it('should add a client', async ()=> {
        const repository = mockRepository();
        const clientUsecase = new AddClientUseCase(repository);
        const input = {
            id: '1',
            name: 'client 1',
            email: 'email@email.com',
            address: 'contoso xpto 1'
        };

        const result = await clientUsecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.address).toEqual(input.address);
    })
});