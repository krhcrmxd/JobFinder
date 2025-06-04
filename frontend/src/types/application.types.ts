import { ApplicationStatus } from "./enums";

export interface ICreateApplication {
    cvId: string;
    vacancyId: string;
    //status: ApplicationStatus;
}

export interface IApplication {
    status: ApplicationStatus;
    id: string;
    cvId: string;
    vacancyId: string;
    createdAt: Date;
}
