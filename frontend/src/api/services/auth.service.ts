import { axiosAuth, axiosNoAuth } from "@/api/axios.config";
import type { ILogin, ILoginResponse, INewTokenResponse, IRegister } from "@/types/auth.types";

import AuthTokenService from "./auth-token.service";

export class AuthService {
    static async getNewTokens() {
        try {
            const response = await axiosNoAuth.post<INewTokenResponse>("/auth/login/access-token");
            if (response.data.accessToken) AuthTokenService.saveAccessToken(response.data.accessToken);
        } catch (e) {
            throw e;
        }
    }

    static async register(data: IRegister) {
        try {
            return await axiosNoAuth.post("/auth/register", data);
        } catch (e) {
            throw e;
        }
    }

    static async login(data: ILogin) {
        try {
            const response = await axiosNoAuth.post<ILoginResponse>("/auth/login", data);
            if (response.data.accessToken) AuthTokenService.saveAccessToken(response.data.accessToken);
            AuthTokenService.saveAccessToken(response.data.accessToken);
            response.data.accessToken = "";
            return response;
        } catch (e) {
            throw e;
        }
    }

    static async logout() {
        try {
            await axiosAuth.post("/auth/logout");

            AuthTokenService.removeAccessToken();
        } catch (e) {
            throw e;
        }
    }
    static async logoutRefresh() {
        try {
            await axiosAuth.post("/auth/logout");
        } catch (e) {
            throw e;
        }
    }
}
