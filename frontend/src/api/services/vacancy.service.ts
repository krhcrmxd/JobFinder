import { Endpoints } from "@/types/enums";
import { ICreateVacancy, IUpdateVacancy, IVacancy } from "@/types/vacancy.types";
import { axiosAuth, axiosNoAuth } from "../axios.config";

export class VacancyService {
    static async create(data: ICreateVacancy) {
        return await axiosAuth.post(Endpoints.vacancy, data);
    }
    static async findAll() {
        return await axiosNoAuth.get(Endpoints.vacancy);
    }
    static async findByHeading(search: string) {
        return await axiosNoAuth.get<IVacancy[]>(`${Endpoints.vacancy}/search`, {
            params: { query: search },
        });
    }
    static async findById(id: string) {
        return await axiosNoAuth.get<IVacancy>(`${Endpoints.vacancy}/${id}`);
    }
    static async update(data: IUpdateVacancy, id: string) {
        return await axiosAuth.patch(`${Endpoints.vacancy}/${id}`, data);
    }
    static async delete(id: string) {
        return await axiosAuth.delete(`${Endpoints.vacancy}/${id}`);
    }
    static async findByUser() {
        return await axiosAuth.get<IVacancy[]>(`${Endpoints.vacancy}/bu`);
    }
}
