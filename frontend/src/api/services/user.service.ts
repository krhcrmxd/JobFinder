import { Endpoints } from "@/types/enums";
import { IUpdateUser, IUser } from "@/types/user.types";
import { axiosAuth } from "../axios.config";
import AuthTokenService from "./auth-token.service";
import { AuthService } from "./auth.service";

export class UserService {
    static async delete() {
        try {
            AuthService.logoutRefresh();
            await axiosAuth.delete(Endpoints.user);
            AuthTokenService.removeAccessToken();
        } catch (e) {
            throw e;
        }
    }

    static async update(data: IUpdateUser) {
        try {
            return await axiosAuth.patch(Endpoints.user, data);
        } catch (e) {
            throw e;
        }
    }

    static async get() {
        try {
            return await axiosAuth.get<IUser>(Endpoints.user);
        } catch (e) {
            throw e;
        }
    }
}
