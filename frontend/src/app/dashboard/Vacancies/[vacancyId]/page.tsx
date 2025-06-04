"use client";
import { ApplicationService } from "@/api/services/application.service";
import { UserService } from "@/api/services/user.service";
import { VacancyService } from "@/api/services/vacancy.service";
import { IApplication } from "@/types/application.types";
import { IUser } from "@/types/user.types";
import { IVacancy } from "@/types/vacancy.types";
import { useRouter } from "next/navigation";

import { useLayoutEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Page({ params }: { params: Promise<{ vacancyId: string }> }) {
    const [vacancy, setVacancy] = useState<IVacancy>();
    const [currentUser, setCurrentUser] = useState<IUser>();
    const [id, setId] = useState<string>("");
    const [application, setApplication] = useState<IApplication | null>();
    const router = useRouter();

    const handleDelete = async () => {
        ApplicationService.delete(application!.id);
        const { toast } = await import("react-hot-toast");
        toast.success("Deleted!");
    };

    const handleClick = async () => {
        if (currentUser) {
            console.log(1);
            if (!currentUser.CV) {
                const { toast } = await import("react-hot-toast");
                toast.error("Create a CV first");
                return;
            }
            console.log(2);
            if (currentUser.vacancies.some((el) => el.id === id)) {
                const { toast } = await import("react-hot-toast");
                toast.error("That`s your own vacancy. You can’t apply for it");
                return;
            }

            const res = await ApplicationService.create({
                cvId: currentUser.CV.id,
                vacancyId: id,
            });
            console.log(3);
            if (res.status !== 201) {
                const { toast } = await import("react-hot-toast");
                toast.error("Something went wrong");
                return;
            } else {
                const { toast } = await import("react-hot-toast");
                toast.success("Application created");
                router.refresh();
                return;
            }
        }
    };

    useLayoutEffect(() => {
        const getData = async () => {
            try {
                const vacancyId = (await params).vacancyId;
                setId(vacancyId);

                const vacancyData = await VacancyService.findById(vacancyId);
                console.log(vacancyData);
                setVacancy(vacancyData.data);

                const userData = await UserService.get();
                setCurrentUser(userData.data);

                const applicationData = await (await ApplicationService.findByCVId(vacancyData.data.id)).data;
                console.log(`Application: ${applicationData}`);
                setApplication(applicationData);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        getData();
    }, [params]);

    console.log(application);

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">{vacancy?.heading}</h1>
                    <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                            vacancy?.priority === "Immediate"
                                ? "bg-red-100 text-red-600"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        {vacancy?.priority}
                    </span>
                </div>

                <div className="text-gray-600 text-sm">
                    Published:{" "}
                    {vacancy &&
                        new Date(vacancy.createdAt).toLocaleDateString("en-EN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                </div>

                <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                    {vacancy?.description}
                </div>

                <div>
                    <h2 className="text-md font-semibold text-gray-800 mb-2">Salary</h2>
                    {vacancy?.salary ? (
                        <p className="text-gray-700 text-md">
                            {vacancy?.salary} {vacancy?.currency}
                        </p>
                    ) : vacancy?.minSalary && vacancy?.maxSalary ? (
                        <p className="text-gray-700 text-md">
                            {vacancy?.minSalary} – {vacancy?.maxSalary} {vacancy?.currency}
                        </p>
                    ) : (
                        <p className="text-gray-400 italic">No info</p>
                    )}
                </div>
                {application ? (
                    <button
                        className="border border-gray-400 p-2 rounded-2xl cursor-pointer hover:bg-black hover:scale-105 hover:text-white duration-300 ease-in-out"
                        type="button"
                        onClick={handleDelete}
                    >
                        Delete an application
                    </button>
                ) : (
                    <button
                        className="border border-gray-400 p-2 rounded-2xl cursor-pointer hover:bg-black hover:scale-105 hover:text-white duration-300 ease-in-out"
                        type="button"
                        onClick={handleClick}
                    >
                        Create an application
                    </button>
                )}
            </div>
        </>
    );
}
