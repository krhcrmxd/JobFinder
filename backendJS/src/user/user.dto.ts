import { Role as Roles } from "@prisma/client";
import {
    IsAlpha,
    IsAlphanumeric,
    IsArray,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MinLength,
} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsAlphanumeric()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsArray()
    @IsEnum(Roles, { each: true })
    roles: Roles[];

    @IsNotEmpty()
    @IsAlpha()
    @IsString()
    @MinLength(2)
    name: string;

    @IsNotEmpty()
    @IsAlpha()
    @IsString()
    @MinLength(2)
    surname: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;
