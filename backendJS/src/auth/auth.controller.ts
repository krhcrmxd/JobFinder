import {
    Body,
    Controller,
    HttpCode,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { Request, Response } from "express";
import { CreateUserDto } from "src/user/user.dto";
import { default as errorHandler } from "src/utils/errorHandler";
import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post("/register")
    @HttpCode(200)
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }

    @Post("/login")
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        try {
            const { refreshToken, ...response } = await this.authService.login(dto);
            this.authService.addRefreshTokenToResponse(res, refreshToken);

            return response;
        } catch (e) {
            errorHandler(e);
        }
    }

    @HttpCode(200)
    @Post("/login/access-token")
    async getNewTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        try {
            const rfTokenFromCookies = req.cookies["refreshToken"];
            if (!rfTokenFromCookies) {
                this.authService.removeRefreshTokenFromResponse(res);
                throw new UnauthorizedException("Refresh token not passed");
            }

            const { refreshToken, ...response } = await this.authService.getNewTokens(rfTokenFromCookies);

            this.authService.addRefreshTokenToResponse(res, refreshToken);

            return response;
        } catch (e) {
            errorHandler(e);
        }
    }

    @HttpCode(200)
    @Post("logout")
    // @UseGuards(AuthGuard("jwt"))
    async logout(@Res({ passthrough: true }) res: Response) {
        this.authService.removeRefreshTokenFromResponse(res);
        return true;
    }
}
