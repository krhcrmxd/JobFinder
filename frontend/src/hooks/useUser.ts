"use client";
import { UserService } from "@/api/services/user.service";
import { IUser } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";

export default function useUser(initData?: IUser) {
    return useQuery<IUser>({
        queryKey: ["user"],
        queryFn: async () => (await UserService.get()).data,
        initialData: initData,
        refetchOnWindowFocus: false,
        retry: 3,
    });
}
