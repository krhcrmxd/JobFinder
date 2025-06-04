"use client";

import { AuthService } from "@/api/services/auth.service";
import { Button } from "@/components/ui/button";
import { ILogin } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    email: z.string().nonempty("Email is required").email("That`s not an email"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long"),
});

//type FormData = z.infer<typeof schema>;

const Login: React.FC = () => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (data: ILogin) => AuthService.login(data),
        onSuccess() {
            router.replace("/dashboard");
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILogin>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: ILogin) => {
        mutation.mutateAsync(data);
    };

    const handleGuestView = () => {
        console.log("Guest view");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white text-black container">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password")}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md cursor-pointer hover:scale-105"
                    >
                        Log In
                    </Button>

                    <div className="flex flex-row gap-1">
                        <p>Have no account?</p>
                        <p
                            className="underline cursor-pointer scale-105"
                            onClick={() => {
                                router.push("/auth/register");
                            }}
                        >
                            Register
                        </p>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm pb-2">Or view as a guest</p>
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer hover:bg-black hover:text-white  duration-300 hover:border-white hover:scale-105"
                        onClick={handleGuestView}
                    >
                        guest view
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
