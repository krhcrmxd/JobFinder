import { Endpoints } from "@/types/enums";
import { ICreateOrder, IOrder, IUpdateOrder } from "@/types/order.types";
import { axiosAuth, axiosNoAuth } from "../axios.config";

export class OrderService {
    static async create(data: ICreateOrder) {
        return await axiosAuth.post(Endpoints.order, data);
    }
    static async findAll() {
        return await axiosNoAuth.get(Endpoints.order);
    }
    static async findByHeading(search: string) {
        return await axiosNoAuth.get<IOrder[]>(`${Endpoints.order}/search`, {
            params: { query: search },
        });
    }
    static async findById(id: string) {
        return await axiosNoAuth.get<IOrder>(`${Endpoints.order}/${id}`);
    }
    static async update(data: IUpdateOrder, id: string) {
        return await axiosAuth.patch(`${Endpoints.order}/${id}`, data);
    }
    static async delete(id: string) {
        return await axiosAuth.delete(`${Endpoints.order}/${id}`);
    }
    static async findByUser() {
        return await axiosAuth.get<IOrder[]>(`${Endpoints.order}/bu`);
    }
}
