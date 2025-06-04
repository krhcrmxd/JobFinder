import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import errorHandler from "src/utils/errorHandler";
import { CreateCvDto, UpdateCvDto } from "./cv.dto";
import { CvService } from "./cv.service";

@Controller("cv")
export class CvController {
    constructor(private readonly cvService: CvService) {}

    @Post()
    @UseGuards(AuthGuard("jwt"))
    async create(@Body() createCvDto: CreateCvDto) {
        try {
            return this.cvService.create(createCvDto);
        } catch (e) {
            errorHandler(e);
        }
    }

    /*@Get()
    async findAll() {
        try {
            return this.cvService.findAll();
        } catch (e) {
            errorHandler(e);
        }
    }*/

    @Get(":id")
    @UseGuards(AuthGuard("jwt"))
    async findOne(@Param("id") id: string) {
        try {
            return this.cvService.findOne(id);
        } catch (e) {
            errorHandler(e);
        }
    }

    @Get("/search")
    @UseGuards(AuthGuard("jwt"))
    async search(@Query("query") query: string) {
        try {
            return this.cvService.findByApplication(query);
        } catch (e) {
            errorHandler(e);
        }
    }

    @Patch(":id")
    @UseGuards(AuthGuard("jwt"))
    async update(@Param("id") id: string, @Body() updateCvDto: UpdateCvDto) {
        try {
            return this.cvService.update(id, updateCvDto);
        } catch (e) {
            errorHandler(e);
        }
    }

    @Delete(":id")
    @UseGuards(AuthGuard("jwt"))
    async remove(@Param("id") id: string) {
        try {
            return this.cvService.remove(id);
        } catch (e) {
            errorHandler(e);
        }
    }
}
