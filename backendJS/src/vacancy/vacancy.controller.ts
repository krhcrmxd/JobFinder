import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import errorHandler from "src/utils/errorHandler";
import { getIdFromReq } from "src/utils/getUserIdFromReq.util";
import { CreateVacancyDto, UpdateVacancyDto } from "./vacancy.dto";
import { VacancyService } from "./vacancy.service";

@Controller("vacancy")
export class VacancyController {
    constructor(
        private readonly vacancyService: VacancyService,
        private Jwt: JwtService,
    ) {}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    async create(@Body() createVacancyDto: CreateVacancyDto) {
        try {
            return this.vacancyService.create(createVacancyDto);
        } catch (e) {
            errorHandler(e);
        }
    }

    @Get()
    async findAll() {
        try {
            return this.vacancyService.findAll();
        } catch (e) {
            errorHandler(e);
        }
    }

    @Get("/search")
    async search(@Query("query") query: string) {
        try {
            return this.vacancyService.findByHeading(query);
        } catch (e) {
            errorHandler(e);
        }
    }

    @Get("/bu")
    @UseGuards(AuthGuard("jwt"))
    async bu(@Req() req: Request) {
        try {
            const userId = await getIdFromReq(req, this.Jwt);
            console.log(userId);
            return this.vacancyService.findByUser(userId);
        } catch (e) {
            errorHandler(e);
        }
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        try {
            return this.vacancyService.findOne(id);
        } catch (e) {
            errorHandler(e);
        }
    }

    @UseGuards(AuthGuard("jwt"))
    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
        try {
            return this.vacancyService.update(id, updateVacancyDto);
        } catch (e) {
            errorHandler(e);
        }
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete(":id")
    async remove(@Param("id") id: string) {
        try {
            return this.vacancyService.remove(id);
        } catch (e) {
            errorHandler(e);
        }
    }
}
