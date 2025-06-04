import { ICreateCv, ICv, IUpdateCv } from "@/types/cv.types";
import { Endpoints } from "@/types/enums";
import { axiosAuth } from "../axios.config";

export class CvService {
    static async create(data: ICreateCv) {
        return await axiosAuth.post<ICv>(Endpoints.cv, data);
    }
    static async findByVacancy(applicationId: string) {
        return await axiosAuth.get<ICv[]>(`${Endpoints.cv}/search`, {
            params: { query: applicationId },
        });
    }
    static async findByID(cvId: string) {
        return await axiosAuth.get(`${Endpoints.cv}/${cvId}`);
    }
    static async update(data: IUpdateCv) {
        console.log(data.userId);
        return await axiosAuth.patch<ICv>(`${Endpoints.cv}/${data.userId}`, {
            content: data.content,
        });
    }
    static async delete(id: string) {
        return await axiosAuth.delete<ICv>(`${Endpoints.cv}/${id}`);
    }
}
