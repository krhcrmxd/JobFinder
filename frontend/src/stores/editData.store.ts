import { IOrder } from "@/types/order.types";
import { IVacancy } from "@/types/vacancy.types";
import { atom } from "jotai";

export const editDataV = atom<IVacancy>();
export const editDataO = atom<IOrder>();
