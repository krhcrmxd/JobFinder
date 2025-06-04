"use client";
import Card from "@/components/card";
import { CreateVacancyForm } from "@/components/modalForms/createVacancyForm";
import { UpdateVacancyForm } from "@/components/modalForms/updateVacancyForm";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import useUserVacancies from "@/hooks/useUserVacancies";
import { PlusCircle } from "lucide-react";

const myVacancies = () => {
    const { data, refetch } = useUserVacancies();
    const { Modal: ModalCR, open: openCR, close: closeCR } = useModal();
    const { Modal: ModalUP, open: openUP, close: closeUP } = useModal();

    return (
        <div>
            <div className="flex flex-row justify-between">
                <p>{`You have ${data ? data.length : "no"} published ${
                    data ? (data.length === 1 ? "vacancy" : "vacancies") : "vacancies"
                }`}</p>
                <Button
                    type="button"
                    variant={"default"}
                    className="bg-white border-2 border-black rounded-2xl cursor-pointer hover:scale-105"
                    onClick={() => {
                        openCR();
                    }}
                >
                    {"Add vacancy"}
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
                                  type="vacancy"
                                  role="owner"
                                  key={val.id}
                                  refetch={refetch}
                                  open={openUP}
                              />
                          ))
                    : null}
            </div>
            <CreateVacancyForm
                Modal={ModalCR}
                close={closeCR}
                refetch={refetch}
            />
            <UpdateVacancyForm
                Modal={ModalUP}
                close={closeUP}
                refetch={refetch}
            />
        </div>
    );
};

export default myVacancies;
