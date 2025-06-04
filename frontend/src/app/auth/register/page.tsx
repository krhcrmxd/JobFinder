"use client";

import { AuthService } from "@/api/services/auth.service";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { IRegister } from "@/types/auth.types";
import { Role } from "@/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    email: z.string().nonempty("Email is required").email("That`s not an email"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long"),
    name: z.string().nonempty("Name is required").min(2, "Name is too short"),
    surname: z.string().nonempty("Surname is required").min(2, "Surname is too short"),
    roles: z.array(z.nativeEnum(Role)).min(1, "At least one role must be selected"),
});

//type FormData = z.infer<typeof schema>;

const roles = Object.values(Role);

const RegisterForm: React.FC = () => {
    const router = useRouter();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegister>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            surname: "",
            roles: [],
        },
    });

    const mutation = useMutation({
        mutationFn: (data: IRegister) => AuthService.register(data),
        onSuccess() {
            router.replace("/auth/login");
        },
        onError(error) {
            console.error(error);
        },
    });

    const onSubmit = async (data: IRegister) => {
        mutation.mutateAsync(data);
    };
    const onError = (errors: any) => {
        console.error("❌ Form errors:", errors);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white text-black container">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
                <form
                    onSubmit={handleSubmit(onSubmit, onError)}
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

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            autoCapitalize="words"
                            type="text"
                            {...register("name")}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label
                            htmlFor="surname"
                            className="block text-sm font-medium"
                        >
                            Surname
                        </label>
                        <input
                            autoCapitalize="words"
                            id="surname"
                            type="text"
                            {...register("surname")}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                        />
                        {errors.surname && <p className="text-red-500 text-sm">{errors.surname.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium pb-1">
                            Roles (pick as much as you need)
                        </label>
                        <Controller
                            name="roles"
                            control={control}
                            render={({ field }) => (
                                <div className="space-y-2">
                                    {roles.map((role) => {
                                        return (
                                            <div
                                                key={role}
                                                className="flex items-center"
                                            >
                                                <Checkbox
                                                    id={role}
                                                    checked={field.value.includes(role)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            field.onChange([...field.value, role]);
                                                        } else {
                                                            field.onChange(
                                                                field.value.filter((r) => r !== role)
                                                            );
                                                        }
                                                    }}
                                                    className="mr-2 cursor-pointer"
                                                />
                                                <label
                                                    htmlFor={role}
                                                    className="text-sm"
                                                >
                                                    {role}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        />
                        {errors.roles && <p className="text-red-500 text-sm">{errors.roles.message}</p>}
                    </div>

                    <div className="flex justify-center mt-4">
                        <Button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-md cursor-pointer hover:scale-105"
                        >
                            Register
                        </Button>
                    </div>

                    <div className="flex flex-row gap-1">
                        <p>Have account?</p>
                        <p
                            className="underline cursor-pointer scale-105"
                            onClick={() => {
                                router.push("/auth/login");
                            }}
                        >
                            Log in
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
