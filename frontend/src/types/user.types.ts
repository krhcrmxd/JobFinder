import { ICv } from "./cv.types";
import { Role } from "./enums";
import { IOrder } from "./order.types";
import { IVacancy } from "./vacancy.types";

export interface IUser {
    id: string;

    email: string;

    roles: Role[];

    updatedAt: Date;
    createdAt: Date;

    name?: string;
    surname?: string;
    //companyName?: string;
    portfolioLinks?: string[];

    CV: ICv;
    vacancies: IVacancy[];
    orders: IOrder[];
}

export type IUpdateUser = Partial<
    Omit<IUser, "createdAt" | "updatedAt" | "id" | "vacancies" | "orders" | "CV">
> & { password?: string };
