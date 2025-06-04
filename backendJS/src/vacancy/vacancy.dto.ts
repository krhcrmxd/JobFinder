import { Currency, Priority } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateVacancyDto {
    @IsOptional()
    @IsInt({ message: "Salary field must be a int" })
    salary: number;

    @IsOptional()
    @IsInt({ message: "minSalary field must be a int" })
    minSalary: number;

    @IsOptional()
    @IsInt({ message: "maxSalary field must be a int" })
    maxSalary: number;

    @IsNotEmpty()
    @IsEnum(Currency, { message: "invalid currency" })
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

export type UpdateVacancyDto = Partial<Omit<CreateVacancyDto, "userId">>;
