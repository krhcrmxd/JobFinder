import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateApplicationDto, UpdateApplicationDto } from "./application.dto";

@Injectable()
export class ApplicationService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateApplicationDto) {
        return await this.prisma.application.create({
            data: {
                cvId: dto.cvId,
                vacancyId: dto.vacancyId,
            },
        });
    }

    async findAll() {
        return await this.prisma.application.findMany();
    }

    async findByVacancy(vacancyId: string) {
        console.log(vacancyId);
        const res = await this.prisma.application.findMany({
            where: { vacancyId: vacancyId },
        });
        console.log(res);
        return res;
    }

    async findByCVId(cvId: string, vacId: string) {
        // console.log(cvId);
        // console.log(vacId);
        return await this.prisma.application.findUnique({
            where: {
                cvId_vacancyId: {
                    cvId: cvId,
                    vacancyId: vacId,
                },
            },
        });
    }

    async findOne(id: string) {
        const application = await this.prisma.application.findUnique({ where: { id } });
        if (!application) throw new NotFoundException("Application not found");
        return application;
    }

    async update(id: string, dto: UpdateApplicationDto) {
        return await this.prisma.application.update({
            where: { id },
            data: { status: dto.status },
        });
    }

    async remove(id: string) {
        return await this.prisma.application.delete({ where: { id } });
    }
}
