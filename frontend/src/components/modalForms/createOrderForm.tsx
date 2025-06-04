import { OrderService } from "@/api/services/order.service";
import { ModalProps } from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import { Currency, Priority } from "@/types/enums";
import { ICreateOrder } from "@/types/order.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const currencies = Object.values(Currency);
const priorities = Object.values(Priority);

const createVacancySchema = z.object({
    payment: z.coerce.number({ message: "Must be a number" }).min(0, "Must be bigger than zero").optional(),
    currency: z.enum([Currency.EUR, Currency.USD, Currency.UAH]),
    heading: z.string().min(1, "too short"),
    description: z.string().min(10, "too short"),
    priority: z.enum([Priority.Normal, Priority.Immediate]),
});

type CreateOrderFormData = z.infer<typeof createVacancySchema>;

type Props = {
    Modal: React.FC<ModalProps>;
    close: () => void;
    refetch: () => void;
};

export const CreateOrderForm = ({ Modal, close, refetch }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateOrderFormData>({
        resolver: zodResolver(createVacancySchema),
    });

    const mutationCreate = useMutation({
        mutationFn: (data: ICreateOrder) => OrderService.create(data),
        onSuccess() {
            close();
            refetch();
        },
    });

    const { data: user } = useUser();

    const onSubmit = (data: CreateOrderFormData) => {
        const rData = data as ICreateOrder;
        rData.userId = user!.id;
        mutationCreate.mutateAsync(rData);
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
                    />
                    {errors.heading && <p className="text-red-500 text-sm">{errors.heading.message}</p>}
                </div>

                <div>
                    <label className="block font-semibold">Description</label>
                    <textarea
                        {...register("description")}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black resize-none"
                        rows={6}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                </div>
                <div>
                    <div>
                        <label className="block font-semibold mb-1">Payment</label>
                        <input
                            type="number"
                            {...register("payment")}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        {errors.payment && <p className="text-red-500 text-sm">{errors.payment.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block font-semibold">Currency</label>
                    <select
                        {...register("currency")}
                        className="w-full border rounded p-2"
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
                    Create order
                </button>
            </form>
        </Modal>
    );
};
