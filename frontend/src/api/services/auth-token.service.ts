import { Tokens } from "@/types/enums";
import Cookies from "js-cookie";

export default class AuthTokenService {
    static getAccessToken() {
        const accessToken = Cookies.get(Tokens.ACCESS_TOKEN);
        return accessToken;
    }

    static saveAccessToken = (accessToken: string) => {
        Cookies.set(Tokens.ACCESS_TOKEN, accessToken, {
            domain: "localhost",
            sameSite: "Strict",
            expires: 1,
            secure: true,
        });
    };

    static removeAccessToken() {
        Cookies.remove(Tokens.ACCESS_TOKEN);
    }
}
