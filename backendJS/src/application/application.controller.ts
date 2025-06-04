import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { UserService } from "src/user/user.service";
import errorHandler from "src/utils/errorHandler";
import { getIdFromReq } from "src/utils/getUserIdFromReq.util";
import { CreateApplicationDto, UpdateApplicationDto } from "./application.dto";
import { ApplicationService } from "./application.service";

@Controller("applications")
export class ApplicationController {
    constructor(
        private readonly applicationService: ApplicationService,
        private readonly Jwt: JwtService,
        private readonly userService: UserService,
    ) {}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async create(@Body() createApplicationDto: CreateApplicationDto) {
        return this.applicationService.create(createApplicationDto);
    }

    @Get()
    @UseGuards(AuthGuard("jwt"))
    async findAll() {
        return this.applicationService.findAll();
    }

    /* @UseGuards(AuthGuard("jwt"))
    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.applicationService.findOne(id);
    }*/

    @Get(":vacId")
    @UseGuards(AuthGuard("jwt"))
    async findByCV(@Req() req: Request, @Param("vacId") vacId: string) {
        try {
            const userId = await getIdFromReq(req, this.Jwt);
            const user = await this.userService.getUserById(userId);
            return this.applicationService.findByCVId(user.CV.id, vacId);
        } catch (e) {
            errorHandler(e);
        }
    }

    /*@Get("/vacFind")
    async findByVacancy(@Query("query") query: string) {
        try {
            console.log(123123);
            return this.applicationService.findByVacancy(query);
        } catch (e) {
            errorHandler(e);
        }
    }*/
    @Post("/vacFind")
    async findByVacancy(@Body() { id }: { id: string }) {
        try {
            console.log(123123);
            return this.applicationService.findByVacancy(id);
        } catch (e) {
            errorHandler(e);
        }
    }

    @Patch(":id")
    @UseGuards(AuthGuard("jwt"))
    async update(@Param("id") id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
        return this.applicationService.update(id, updateApplicationDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete(":id")
    async remove(@Param("id") id: string) {
        return this.applicationService.remove(id);
    }
}
