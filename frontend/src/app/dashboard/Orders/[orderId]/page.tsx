import { OrderService } from "@/api/services/order.service";

export default async function Page({ params }: { params: Promise<{ orderId: string }> }) {
    const orderId = (await params).orderId;
    const order = (await OrderService.findById(orderId)).data;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">{order?.heading}</h1>
                <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                        order?.priority === "Immediate"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                    }`}
                >
                    {order?.priority}
                </span>
            </div>

            <div className="text-gray-600 text-sm">
                Published:{" "}
                {order &&
                    new Date(order.createdAt).toLocaleDateString("en-EN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
            </div>

            <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {order?.description}
            </div>

            <div>
                <h2 className="text-md font-semibold text-gray-800 mb-2">Payment</h2>
                {order?.payment && (
                    <p className="text-gray-700 text-md">
                        {order?.payment} {order?.currency}
                    </p>
                )}
            </div>
        </div>
    );
}
