import { VacancyService } from "@/api/services/vacancy.service";
import { ModalProps } from "@/hooks/useModal";
import { editDataV } from "@/stores/editData.store";
import { Currency, Priority } from "@/types/enums";
import { IUpdateVacancy } from "@/types/vacancy.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const currencies = Object.values(Currency);
const priorities = Object.values(Priority);

const createVacancySchema = z
    .object({
        salary: z.coerce
            .number({ message: "Must be a number" })
            .min(0, "Must be bigger than zero")
            .optional(),
        minSalary: z.coerce
            .number({ message: "Must be a number" })
            .min(0, "Must be bigger than zero")
            .optional(),
        maxSalary: z.coerce
            .number({ message: "Must be a number" })
            .min(0, "Must be bigger than zero")
            .optional(),
        currency: z.enum([Currency.EUR, Currency.USD, Currency.UAH]),
        heading: z.string().min(1, "too short"),
        description: z.string().min(10, "too short"),
        priority: z.enum([Priority.Normal, Priority.Immediate]),
    })
    .refine(
        (data) => !!data.salary || (typeof data.minSalary === "number" && typeof data.maxSalary === "number"),
        {
            message: "Either salary or both minSalary and maxSalary must be provided",
            path: ["salary"],
        }
    )
    .refine(
        (data) => {
            if (data.minSalary && data.maxSalary) {
                return data.minSalary <= data.maxSalary;
            }
            return true;
        },
        {
            message: "minSalary must be less than or equal to maxSalary",
            path: ["minSalary"],
        }
    );

type CreateVacancyFormData = z.infer<typeof createVacancySchema>;

type Props = {
    Modal: React.FC<ModalProps>;
    close: () => void;
    refetch: () => void;
};

export const UpdateVacancyForm = ({ Modal, close, refetch }: Props) => {
    const [editData] = useAtom(editDataV);

    const [salaryType, setSalaryType] = useState<"exact" | "range">(editData?.salary ? "exact" : "range");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateVacancyFormData>({
        resolver: zodResolver(createVacancySchema),
    });

    const mutationUpdate = useMutation({
        mutationFn: (data: IUpdateVacancy) => VacancyService.update(data, editData!.id),
        onSuccess() {
            close();
            refetch();
        },
    });

    const onSubmit = (data: CreateVacancyFormData) => {
        mutationUpdate.mutateAsync(data);
    };

    return (
        <Modal>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-xl mx-auto p-4 space-y-4"
            >
                <div>
                    <label className="block font-semibold">Heading</label>
                    <input
                        {...register("heading")}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                        defaultValue={editData?.heading}
                    />
                    {errors.heading && <p className="text-red-500 text-sm">{errors.heading.message}</p>}
                </div>

                <div>
                    <label className="block font-semibold">Description</label>
                    <textarea
                        {...register("description")}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black resize-none"
                        rows={6}
                        defaultValue={editData?.description}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-2">Enter the exact salary or select a range</p>

                    <div className="mb-4">
                        <select
                            value={salaryType}
                            onChange={(e) => setSalaryType(e.target.value as "exact" | "range")}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                        >
                            <option value="exact">Exact salary</option>
                            <option value="range">Salary range</option>
                        </select>
                    </div>

                    {salaryType === "exact" ? (
                        <div>
                            <label className="block font-semibold mb-1">Salary</label>
                            <input
                                type="number"
                                {...register("salary")}
                                defaultValue={editData?.salary}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                            />
                            {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold mb-1">Min Salary</label>
                                <input
                                    type="number"
                                    {...register("minSalary")}
                                    defaultValue={editData?.minSalary}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                />
                                {errors.minSalary && (
                                    <p className="text-red-500 text-sm">{errors.minSalary.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Max Salary</label>
                                <input
                                    type="number"
                                    {...register("maxSalary")}
                                    defaultValue={editData?.maxSalary}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                />
                                {errors.maxSalary && (
                                    <p className="text-red-500 text-sm">{errors.maxSalary.message}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block font-semibold">Currency</label>
                    <select
                        {...register("currency")}
                        className="w-full border rounded p-2"
                        defaultValue={editData?.currency}
                    >
                        {currencies.map((cur) => (
                            <option
                                key={cur}
                                value={cur}
                            >
                                {cur}
                            </option>
                        ))}
                    </select>
                    {errors.currency && <p className="text-red-500 text-sm">{errors.currency.message}</p>}
                </div>

                <div>
                    <label className="block font-semibold">Priority</label>
                    <select
                        {...register("priority")}
                        className="w-full border rounded p-2"
                        defaultValue={editData?.priority}
                    >
                        {priorities.map((p) => (
                            <option
                                key={p}
                                value={p}
                            >
                                {p}
                            </option>
                        ))}
                    </select>
                    {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Save changes
                </button>
            </form>
        </Modal>
    );
};
