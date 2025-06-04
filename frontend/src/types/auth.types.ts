import { Role } from "./enums";
import { IUser } from "./user.types";

export interface IRegister {
    email: string;
    password: string;

    roles: Role[];

    name: string;
    surname: string;
}

export type ILogin = Pick<IRegister, "email" | "password">;

export interface ILoginResponse extends IUser {
    accessToken: string;
}
export type INewTokenResponse = Pick<ILoginResponse, "accessToken">;
