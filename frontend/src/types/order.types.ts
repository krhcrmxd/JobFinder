import { Currency, Priority } from "./enums";

export interface ICreateOrder {
    payment: number;

    currency: Currency;

    heading: string;

    description: string;

    priority: Priority;

    userId: string;
}
export type IUpdateOrder = Partial<Omit<ICreateOrder, "userId">>;

export type IOrder = ICreateOrder & { id: string; createdAt: Date };
