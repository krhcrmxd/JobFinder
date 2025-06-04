import { IApplication, ICreateApplication } from "@/types/application.types";
import { ApplicationStatus, Endpoints } from "@/types/enums";
import { axiosAuth } from "../axios.config";

export class ApplicationService {
    static async create(data: ICreateApplication) {
        return await axiosAuth.post<IApplication>(Endpoints.application, data);
    }

    /*static async findByVacancy(vacancyId: string) {
        return await axiosAuth.get<IApplication[]>(`${Endpoints.application}/vacFind`, vacancyId);
    }*/

    static async findByVacancy(vacancyId: string) {
        return await axiosAuth.post<IApplication[]>(`${Endpoints.application}/vacFind`, { id: vacancyId });
    }

    static async delete(id: string) {
        return await axiosAuth.delete(`${Endpoints.application}/${id}`);
    }

    static async findByCVId(vacId: string) {
        return await axiosAuth.get(`${Endpoints.application}/${vacId}`);
    }

    static async update(id: string, data: { status: ApplicationStatus }) {
        return await axiosAuth.patch(`${Endpoints.application}/${id}`, data);
    }
}
