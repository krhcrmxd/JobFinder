"use client";
import Card from "@/components/card";
import { CreateOrderForm } from "@/components/modalForms/createOrderForm";
import { UpdateOrderForm } from "@/components/modalForms/updateOrderForm";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import useUserOrders from "@/hooks/useUserOrders";
import { PlusCircle } from "lucide-react";

const myOrders = () => {
    const { data, refetch } = useUserOrders();
    const { Modal: ModalCR, open: openCR, close: closeCR } = useModal();
    const { Modal: ModalUP, open: openUP, close: closeUP } = useModal();

    return (
        <div>
            <div className="flex flex-row justify-between">
                <p>{`You have ${data ? data.length : "no"} published ${
                    data ? (data.length === 1 ? "order" : "orders") : "orders"
                }`}</p>
                <Button
                    type="button"
                    variant={"default"}
                    className="bg-white border-2 border-black rounded-2xl cursor-pointer hover:scale-105"
                    onClick={() => {
                        openCR();
                    }}
                >
                    {"Add order"}
                    <PlusCircle />
                </Button>
            </div>
            <div className="flex flex-col gap-5 items-center mt-10">
                {data
                    ? [...data]
                          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                          .map((val) => (
                              <Card
                                  data={val}
                                  type="order"
                                  role="owner"
                                  key={val.id}
                                  refetch={refetch}
                                  open={openUP}
                              />
                          ))
                    : null}
            </div>
            <CreateOrderForm
                Modal={ModalCR}
                close={closeCR}
                refetch={refetch}
            />
            <UpdateOrderForm
                Modal={ModalUP}
                close={closeUP}
                refetch={refetch}
            />
        </div>
    );
};

export default myOrders;
