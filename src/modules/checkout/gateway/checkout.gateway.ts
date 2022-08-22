import { Order } from "sequelize/types";

export default interface ChekoutGateway {
    addOrder(order: Order): Promise<void>;
    findOrder(id: string): Promise<Order | null>;
}