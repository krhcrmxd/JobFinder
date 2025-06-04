"use client";

import { AuthService } from "@/api/services/auth.service";
import CVForm from "@/components/modalForms/cvForm";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import useUser from "@/hooks/useUser";
import { TabRoles, Tabs } from "@/types/enums";
import { Edit2, LogOut, PlusCircle, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Links {
    key: string;
    value: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { data: user } = useUser();
    const { Modal, open, close } = useModal();

    const router = useRouter();

    const navLinks: Links[] = useMemo(() => {
        const arr: Links[] = [];
        user?.roles.forEach((role) => {
            const key = Object.entries(TabRoles).find(([key, value]) => value === role)?.[0];
            if (key) {
                const value = Object.entries(Tabs).find(([tabKey, val]) => tabKey === key)?.[1];
                if (value) {
                    arr.push({ key, value });
                }
            }
        });
        return arr;
    }, [user?.roles]);

    return (
        <>
            <header className="bg-white text-black shadow-md p-4 flex justify-between items-center container">
                <div className="text-xl font-bold">JobFinder</div>
                <nav className="flex gap-10 w-2/3">
                    {navLinks.map(({ key, value }) => (
                        <p
                            key={key}
                            className="hover:underline transition-all text-sm font-medium"
                            onClick={() => {
                                router.replace(`/dashboard/${key}`);
                            }}
                        >
                            {value}
                        </p>
                    ))}
                </nav>
                {user?.CV ? (
                    <Button
                        type="button"
                        variant={"default"}
                        className="bg-white border-2 border-black rounded-2xl cursor-pointer hover:scale-105 duration-300 ease-in-out"
                        onClick={() => {
                            open();
                        }}
                    >
                        {"Edit CV"}
                        <Edit2 />
                    </Button>
                ) : (
                    <Button
                        type="button"
                        variant={"default"}
                        className="bg-white border-2 border-black rounded-2xl cursor-pointer hover:scale-105"
                        onClick={() => {
                            open();
                        }}
                    >
                        {"Create CV"}
                        <PlusCircle />
                    </Button>
                )}
                <div className="flex gap-4">
                    <Settings
                        onClick={() => {
                            router.push("/dashboard/settings");
                        }}
                        className="cursor-pointer hover:scale-105"
                    />
                    <LogOut
                        onClick={async () => {
                            await AuthService.logout();
                            router.refresh();
                        }}
                        className="cursor-pointer hover:scale-105"
                    />
                </div>
            </header>
            <CVForm
                Modal={Modal}
                close={close}
                initialText={user?.CV?.content || ""}
            />

            <main className="p-4 container">{children}</main>
        </>
    );
}
