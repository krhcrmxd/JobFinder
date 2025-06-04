"use client";
import { OrderService } from "@/api/services/order.service";
import { VacancyService } from "@/api/services/vacancy.service";
import { editDataO, editDataV } from "@/stores/editData.store";
import { Priority } from "@/types/enums";
import { IOrder } from "@/types/order.types";
import { IVacancy } from "@/types/vacancy.types";
import dateFormat from "@/utils/dateFormat";
import { useAtom } from "jotai";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    data: IVacancy | IOrder;
    type: "vacancy" | "order";
    role: "viewer" | "owner";
    refetch?: () => void;
    open?: () => void;
}

const Card = ({ data, type, role, refetch, open }: Props) => {
    const router = useRouter();
    const [, setDataV] = useAtom(editDataV);
    const [, setDataO] = useAtom(editDataO);

    const moneyFormat = () => {
        if (type === "order") {
            const order = data as IOrder;
            return `Payment: ${order.payment} ${data.currency}`;
        }
        if (type === "vacancy") {
            const vacancy = data as IVacancy;
            if (vacancy.salary) {
                return `Salary: ${vacancy.salary} ${data.currency}`;
            } else {
                return `Salary range: ${vacancy.minSalary} - ${vacancy.maxSalary}  ${data.currency}`;
            }
        }
    };

    return (
        <div
            className={`p-4 border-2 rounded-2xl shadow-sm bg-white hover:shadow-md transition duration-200 w-1/2 ${
                data.priority === Priority.Immediate ? "border-red-500" : ""
            }`}
            onClick={() => {
                if (type === "vacancy") {
                    router.push(`/dashboard/Vacancies/${data.id}`);
                } else {
                    router.push(`/dashboard/Orders/${data.id}`);
                }
            }}
        >
            {role === "owner" && (
                <div className="flex flex-row justify-between">
                    <h2 className="text-xl font-semibold text-black mb-1">{data.heading}</h2>
                    <div className="flex flex-row gap-1.5">
                        <Edit
                            className="cursor-pointer scale-105"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (open) open();

                                if (type === "vacancy") {
                                    setDataV(data as IVacancy);
                                } else {
                                    setDataO(data as IOrder);
                                }
                            }}
                        />
                        <Trash2
                            className="cursor-pointer scale-105"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (type === "vacancy") {
                                    VacancyService.delete(data.id);
                                    if (refetch) refetch();
                                } else {
                                    OrderService.delete(data.id);
                                    if (refetch) refetch();
                                }
                            }}
                        />
                    </div>
                </div>
            )}
            {role === "viewer" && <h2 className="text-xl font-semibold text-black mb-1">{data.heading}</h2>}

            <h3 className="text-lg font-medium text-gray-800 mb-2">{moneyFormat()}</h3>
            <p className="text-sm text-gray-500">{dateFormat(data)}</p>

            {type === "vacancy" && role === "owner" && (
                <p
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/applications/${data.id}`);
                    }}
                    className="cursor-pointer"
                >
                    See Applications
                </p>
            )}
        </div>
    );
};

export default Card;
