import { IOrder } from "@/types/order.types";
import { IVacancy } from "@/types/vacancy.types";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

export default function dateFormat(data: IVacancy | IOrder) {
    try {
        const seconds = differenceInSeconds(Date.now(), data.createdAt);
        if (seconds < 60) {
            return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
        }
        const minutes = differenceInMinutes(Date.now(), data.createdAt);
        if (minutes < 60) {
            return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
        }
        const hours = differenceInHours(Date.now(), data.createdAt);
        if (hours < 24) {
            return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
        }
        const days = differenceInDays(Date.now(), data.createdAt);
        return `${days} ${days === 1 ? "day" : "days"} ago`;
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        } else {
            console.log(e);
        }
        return "unknown time ago";
    }
}
