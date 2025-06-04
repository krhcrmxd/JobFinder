import { Currency, Priority } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsInt()
    payment: number;

    @IsNotEmpty()
    @IsEnum(Currency)
    currency: Currency;

    @IsNotEmpty()
    @IsString()
    heading: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsEnum(Priority)
    priority: Priority;

    @IsNotEmpty()
    @IsString()
    userId: string;
}

export type UpdateOrderDto = Partial<Omit<CreateOrderDto, "userId">>;
