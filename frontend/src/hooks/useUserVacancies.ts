"use client";
import { VacancyService } from "@/api/services/vacancy.service";
import { IVacancy } from "@/types/vacancy.types";
import { useQuery } from "@tanstack/react-query";

export default function useUserVacancies() {
    return useQuery<IVacancy[]>({
        queryKey: ["userVacancies"],
        queryFn: async () => (await VacancyService.findByUser()).data,
        refetchOnWindowFocus: false,
        retry: 3,
    });
}
