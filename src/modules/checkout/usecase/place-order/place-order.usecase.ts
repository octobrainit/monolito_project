import UseCaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUsecase implements UseCaseInterface<PlaceOrderInputDto, PlaceOrderOutputDto> {
    
    private _clientFacade: ClientAdmFacadeInterface;

    constructor(clientFacade: ClientAdmFacadeInterface) {
        this._clientFacade = clientFacade;
    }
    
    async execute(data: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        
        const client = await this._clientFacade.findClient({ id: data.clientId });
        
        if(!client) throw new Error('Client not found');

        await this.validateProducts(data);
        
        return {
            id: '',
            invoiceId: '',
            status: '',
            total: 0,
            products: []
        };
    }

    private async validateProducts(data: PlaceOrderInputDto): Promise<void> {
        if(data.products.length === 0) throw new Error('No product selected')
    }

}