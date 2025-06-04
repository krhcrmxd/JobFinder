"use client";
import { OrderService } from "@/api/services/order.service";
import Card from "@/components/card";
import { IOrder } from "@/types/order.types";
import { Search } from "lucide-react";
import { useRef, useState } from "react";

const Orders = () => {
    const [data, setData] = useState<IOrder[]>();
    const [error, setError] = useState<string>("");
    const ref = useRef<HTMLInputElement>(null);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleSearch = async () => {
        setIsClicked(true);
        if (ref.current) {
            if (/[<>={}[\]\/\\$"]/.test(ref.current.value)) {
                setError("Contains invalid symbols");
            } else {
                const res = await OrderService.findByHeading(ref.current.value);
                if (res.status != 200) {
                    setError(res.statusText);
                } else {
                    setData(res.data);
                }
            }
        }
    };
    return (
        <>
            <div className="space-x-5">
                <h1 className="text-center font-semibold text-2xl mb-5">SEARCH FOR AN ORDER</h1>
                <div className="flex flex-row gap-2 items-center justify-center">
                    <input
                        className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                        ref={ref}
                    />

                    <Search
                        className="hover:cursor-pointer"
                        onClick={handleSearch}
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex flex-col gap-5 items-center"></div>
                <div className="flex flex-col gap-5 items-center mt-10">
                    {!data || data.length === 0 ? (
                        <p>{isClicked ? "No orders" : ""}</p>
                    ) : (
                        [...data]
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((val) => (
                                <Card
                                    data={val}
                                    type="order"
                                    role="viewer"
                                    key={val.id}
                                />
                            ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Orders;
