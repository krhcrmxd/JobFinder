import { ApplicationStatus } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class CreateApplicationDto {
    @IsString()
    cvId: string;

    @IsString()
    vacancyId: string;

    // @IsEnum(ApplicationStatus)
    // status: ApplicationStatus;
}

export class UpdateApplicationDto {
    @IsEnum(ApplicationStatus)
    status: ApplicationStatus;
}
