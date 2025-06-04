import { Body, Controller, Delete, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import errorHandler from "src/utils/errorHandler";
import { getIdFromReq } from "src/utils/getUserIdFromReq.util";
import { UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private Jwt: JwtService,
    ) {}

    @Get()
    @UseGuards(AuthGuard("jwt"))
    async getUser(@Req() req: Request) {
        try {
            const id = await getIdFromReq(req, this.Jwt);
            const user = await this.userService.getUserById(id);
            const { password, ...data } = user;
            return data;
        } catch (e) {
            errorHandler(e);
        }
    }

    /* @Post("/")
    async createUser(@Body() dto: CreateUserDto) {
        return await this.userService.createUser(dto);
    }*/

    @Patch()
    @UseGuards(AuthGuard("jwt"))
    async updateUser(@Body() dto: UpdateUserDto, @Req() req: Request) {
        try {
            const id = await getIdFromReq(req, this.Jwt);

            const user = await this.userService.updateUser(dto, id);
            const { password, ...data } = user;
            return data;
        } catch (e) {
            errorHandler(e);
        }
    }

    @Delete()
    @UseGuards(AuthGuard("jwt"))
    async deleteUser(@Req() req: Request) {
        try {
            const id = await getIdFromReq(req, this.Jwt);
            await this.userService.deleteUser(id);
        } catch (e) {
            errorHandler(e);
        }
    }
}
