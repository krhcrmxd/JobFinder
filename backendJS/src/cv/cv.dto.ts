import { IsNotEmpty, IsString } from "class-validator";

export class CreateCvDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    @IsString()
    userId: string;
}

export type UpdateCvDto = Omit<CreateCvDto, "userId">;
