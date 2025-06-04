import { CreateUserDto } from "src/user/user.dto";

export type LoginDto = Pick<CreateUserDto, "email" | "password">;
