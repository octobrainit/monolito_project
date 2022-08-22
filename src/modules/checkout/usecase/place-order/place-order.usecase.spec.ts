import Client from "../../domain/client.entity";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUsecase from "./place-order.usecase";

describe('place order usecase unit test', () => {

    describe('execute method', () => {

        it('should throw error when client not found', async () => {
            const mockFacade = {
                findClient: jest.fn().mockResolvedValue(null),
                addClient: jest.fn()
            }
            const placeOrderUsecase = new PlaceOrderUsecase(mockFacade);
            
            const input: PlaceOrderInputDto = {
                clientId: '0',
                products: []
            };

            await expect(placeOrderUsecase.execute(input)).rejects.toThrow(new Error('Client not found'));
        });

        it('should throw an error when product are not valid', async () => {
            const mockFacade = {
                findClient: jest.fn().mockResolvedValue(new Client({address: '', name:'', email: ''})),
                addClient: jest.fn()
            }
            const placeOrderUsecase = new PlaceOrderUsecase(mockFacade);
            const mockValidateProduct = jest.spyOn(placeOrderUsecase as any, 'validateProducts');
            
            const input: PlaceOrderInputDto = {
                clientId: '0',
                products: []
            };

            await expect(placeOrderUsecase.execute(input)).rejects.toThrow(new Error('No product selected'));
            expect(mockValidateProduct).toHaveBeenCalledTimes(1);
        });


    })

    
})