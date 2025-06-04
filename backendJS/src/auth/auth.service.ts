import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { Response } from "express";
import { CreateUserDto } from "src/user/user.dto";
import { UserService } from "src/user/user.service";
import errorHandler from "src/utils/errorHandler";
import { LoginDto } from "./login.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private JwtService: JwtService,
    ) {}

    async register(dto: CreateUserDto) {
        try {
            const user = await this.userService.getUserByEmail(dto.email);
            if (user) {
                throw new BadRequestException("This email is already taken");
            }

            dto.password = await bcrypt.hash(dto.password, 5);

            await this.userService.createUser(dto);
        } catch (e) {
            errorHandler(e);
        }
    }

    async login(dto: LoginDto) {
        try {
            const user = await this.userService.getUserByEmail(dto.email);
            if (!user) {
                throw new BadRequestException("No user with this email");
            }

            const correctPassword = await bcrypt.compare(dto.password, user.password);
            if (!correctPassword) {
                throw new BadRequestException("Wrong password");
            }
            const { password, ...data } = user;

            const { accessToken, refreshToken } = await this.generateTokens(user);
            return { accessToken, refreshToken, data };
        } catch (e) {
            errorHandler(e);
        }
    }

    private async generateTokens(user: User) {
        try {
            const payloadAccess = { email: user.email, id: user.id, roles: user.roles };
            const payloadRefresh = { id: user.id };

            const refreshToken = this.JwtService.sign(payloadRefresh, {
                expiresIn: "7d",
            });
            const accessToken = this.JwtService.sign(payloadAccess, {
                expiresIn: "3hr",
            });

            return { accessToken, refreshToken };
        } catch (e) {
            errorHandler(e);
        }
    }

    addRefreshTokenToResponse(res: Response, refreshToken: string) {
        try {
            const expireIn = new Date();
            expireIn.setDate(expireIn.getDate() + 7);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                expires: expireIn,
                domain: "localhost",
                secure: true,
                sameSite: "none",
            });
        } catch (e) {
            errorHandler(e);
        }
    }
    removeRefreshTokenFromResponse(res: Response) {
        try {
            res.cookie("refreshToken", "", {
                httpOnly: true,
                expires: new Date(0),
                domain: "localhost",
                secure: true,
                sameSite: "none",
            });
        } catch (e) {
            errorHandler(e);
        }
    }

    async getNewTokens(refreshToken: string) {
        try {
            const result = await this.JwtService.verifyAsync(refreshToken);

            if (!result) {
                throw new UnauthorizedException("Invalid refresh token");
            }

            const user = await this.userService.getUserById(result.id);

            const tokens = await this.generateTokens(user);

            return tokens;
        } catch (e) {
            errorHandler(e);
        }
    }
}
