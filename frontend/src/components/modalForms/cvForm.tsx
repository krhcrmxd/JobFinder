"use client";

import { CvService } from "@/api/services/cv.service";
import { ModalProps } from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import { ICreateCv, IUpdateCv } from "@/types/cv.types";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type CVProps = {
    Modal: React.FC<ModalProps>;
    close: () => void;
    initialText?: string;
};

const CVForm = ({ Modal, close, initialText }: CVProps) => {
    const [error, setError] = useState<string>("");

    const { data: user, refetch } = useUser();

    const mutationCreate = useMutation({
        mutationFn: (data: ICreateCv) => CvService.create(data),
        onSuccess() {
            close();
            refetch();
        },
        onError(error) {
            setError(error.message);
        },
    });
    const mutationUpdate = useMutation({
        mutationFn: (data: IUpdateCv) => CvService.update(data),
        onSuccess() {
            close();
            refetch();
        },
        onError(error) {
            setError(error.message);
        },
    });

    const ref = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (ref.current) {
            if (/[<>={}[\]\/\\$"]/.test(ref.current.value)) {
                setError("Contains invalid symbols");
            } else {
                if (initialText) {
                    mutationUpdate.mutateAsync({ content: ref.current.value, userId: user!.id });
                } else {
                    mutationCreate.mutateAsync({ userId: user!.id, content: ref.current.value });
                }
            }
        }
    };

    return (
        <Modal>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-6"
            >
                <div className="flex flex-row justify-between">
                    <label
                        htmlFor="cv"
                        className="mb-2 font-semibold"
                    >
                        Your CV:
                    </label>
                    <X
                        onClick={close}
                        className="inline-block cursor-pointer"
                    />
                </div>
                <Textarea
                    id="cv"
                    ref={ref}
                    rows={15}
                    className="border rounded-md p-3 resize-none focus:ring-1"
                    placeholder="Write your CV..."
                    defaultValue={initialText}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md cursor-pointer hover:scale-105"
                >
                    Save
                </Button>
            </form>
        </Modal>
    );
};

export default CVForm;
