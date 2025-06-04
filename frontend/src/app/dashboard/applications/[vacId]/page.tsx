"use client";
import { ApplicationService } from "@/api/services/application.service";
import { CvService } from "@/api/services/cv.service";
import { IApplication } from "@/types/application.types";
import { ICv } from "@/types/cv.types";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type CVS = ICv & { appId: string };

export default function Page({ params }: { params: Promise<{ vacId: string }> }) {
    const [applications, setApplications] = useState<IApplication[]>([]);
    const [Cvs, setCvs] = useState<CVS[]>();
    const [vacancyId, setVacancyId] = useState<string>();

    useEffect(() => {
        const load = async () => {
            try {
                setVacancyId((await params).vacId);

                const apps = (await ApplicationService.findByVacancy(vacancyId!)).data;
                console.log(apps);
                setApplications(apps);

                const cvs: CVS[] = await Promise.all(
                    apps.map(async (app) => {
                        const cvRes = await CvService.findByID(app.cvId);
                        const cv: CVS = { ...cvRes.data, appId: app.id };
                        return cv;
                    })
                );
                setCvs(cvs);
            } catch (err) {
                console.error("Failed to load applications", err);
            }
        };

        load();
    }, [vacancyId]);

    const handleAccept = (id: string) => {
        ApplicationService.update(id, { status: "Accepted" });
        setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Accepted" } : a)));
    };

    const handleReject = (id: string) => {
        ApplicationService.update(id, { status: "Rejected" });
        setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Rejected" } : a)));
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Applications for Vacancy</h1>

            {applications.length === 0 ? (
                <p className="text-gray-600">No applications found.</p>
            ) : (
                applications.map((app) => {
                    const cv = Cvs?.find((c) => c.appId === app.id);

                    return (
                        <div
                            key={app.id}
                            className={`p-6 border rounded-lg shadow-md transition-all ${
                                app.status === "Accepted"
                                    ? "bg-green-100 border-green-400"
                                    : app.status === "Rejected"
                                    ? "bg-red-100 border-red-400"
                                    : "bg-white border-gray-300"
                            }`}
                        >
                            <div className="text-gray-700">
                                <strong>CV:</strong> {cv?.content || "No CV text available"}
                            </div>
                            <div className="flex gap-4 items-center mt-4">
                                <button
                                    className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                                    onClick={() => handleAccept(app.id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-800 transition-colors cursor-pointer"
                                    onClick={() => handleReject(app.id)}
                                >
                                    Reject
                                </button>
                                <Trash2
                                    onClick={() => {
                                        ApplicationService.delete(app.id);
                                        setApplications((prev) => prev.filter((pr) => app.id !== pr.id));
                                    }}
                                    className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                                    size={20}
                                />
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
