import { Currency, Priority } from "./enums";

export interface ICreateVacancy {
    salary?: number;

    minSalary?: number;

    maxSalary?: number;

    currency: Currency;
    heading: string;
    description: string;
    priority: Priority;

    userId: string;
}
export type IUpdateVacancy = Partial<Omit<ICreateVacancy, "userId">>;

export type IVacancy = ICreateVacancy & { id: string; createdAt: Date };
