"use client";
import { OrderService } from "@/api/services/order.service";
import { IOrder } from "@/types/order.types";
import { useQuery } from "@tanstack/react-query";

export default function useUserOrders() {
    return useQuery<IOrder[]>({
        queryKey: ["userOrders"],
        queryFn: async () => (await OrderService.findByUser()).data,
        refetchOnWindowFocus: false,
        retry: 3,
    });
}
