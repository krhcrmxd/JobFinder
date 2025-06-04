"use client";
import { UserService } from "@/api/services/user.service";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const isSafeInput = (value: string): boolean => {
    const unsafePattern = /[<>]/g;
    return !unsafePattern.test(value);
};

const UpdateUserForm = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const surnameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const name = nameRef.current?.value || "";
        const surname = surnameRef.current?.value || "";
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        if (![name, surname, email, password].every(isSafeInput)) {
            setError("Invalid symbols");
            return;
        }

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setError("Incorrect email format");
            return;
        }

        const res = await UserService.update({
            name: name,
            surname: surname,
            email: email,
            password: password,
        });
        if (res.status === 200) {
            toast.success("User updated successfully!");
        } else {
            toast.error("Error updating user!");
        }
    };

    return (
        <>
            <Toaster></Toaster>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 p-4 bg-white shadow-md rounded-md flex flex-col items-center justify-center"
            >
                <div className="flex flex-col w-1/3">
                    <label className="text-sm font-medium text-gray-700">Name:</label>
                    <input
                        ref={nameRef}
                        type="text"
                        placeholder="Name"
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <div className="flex flex-col w-1/3">
                    <label className="text-sm font-medium text-gray-700">Surname:</label>
                    <input
                        ref={surnameRef}
                        type="text"
                        placeholder="Surname"
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <div className="flex flex-col w-1/3">
                    <label className="text-sm font-medium text-gray-700">Email:</label>
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <div className="flex flex-col w-1/3">
                    <label className="text-sm font-medium text-gray-700">Password:</label>
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="w-1/3 py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black text-center"
                >
                    Save
                </button>
                <button
                    className="w-1/3 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer"
                    onClick={async () => {
                        const res = await UserService.delete();
                    }}
                >
                    Delete account
                </button>
            </form>
        </>
    );
};

export default UpdateUserForm;
