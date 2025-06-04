import axios, { AxiosError, AxiosResponse, type CreateAxiosDefaults } from "axios";
import { errorCatch } from "./errorCatch";
import AuthTokenService from "./services/auth-token.service";
import { AuthService } from "./services/auth.service";

const options: CreateAxiosDefaults = {
    baseURL: "http://localhost:4200/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
};

interface CustomAxiosResponse extends AxiosResponse {
    isRetry?: boolean;
}

const axiosNoAuth = axios.create(options);

const axiosAuth = axios.create(options);

axiosAuth.interceptors.request.use((config) => {
    const accessToken = AuthTokenService.getAccessToken();

    if (config?.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

axiosAuth.interceptors.response.use(
    (config: CustomAxiosResponse) => config,
    async (error: AxiosError) => {
        const ogReq = error.config as CustomAxiosResponse;
        if (
            (error.response?.status === 401 ||
                errorCatch(error) == "jwt expired" ||
                errorCatch(error) == "jwt must be provided") &&
            error.config &&
            !ogReq?.isRetry
        ) {
            ogReq.isRetry = true;

            try {
                await AuthService.getNewTokens();
                return axiosAuth.request(ogReq);
            } catch (err) {
                if (errorCatch(err) == "jwt expired") {
                    AuthService.logout();
                    return Promise.reject(err);
                }
            }
        }
    }
);

export { axiosAuth, axiosNoAuth };
