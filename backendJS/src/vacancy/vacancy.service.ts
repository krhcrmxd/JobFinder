import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateVacancyDto, UpdateVacancyDto } from "./vacancy.dto";

@Injectable()
export class VacancyService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateVacancyDto) {
        return await this.prisma.vacancy.create({
            data: {
                salary: dto.salary,
                minSalary: dto.minSalary,
                maxSalary: dto.maxSalary,
                currency: dto.currency,
                heading: dto.heading,
                description: dto.description,
                priority: dto.priority,
                userId: dto.userId,
            },
        });
    }

    async findAll() {
        return await this.prisma.vacancy.findMany();
    }

    async findByHeading(query: string) {
        return await this.prisma.vacancy.findMany({
            where: {
                heading: {
                    contains: query,
                    mode: "insensitive",
                },
            },
        });
    }

    async findOne(id: string) {
        const res = await this.prisma.vacancy.findUnique({ where: { id: id } });
        console.log(res);
        return res;
    }

    async findByUser(id: string) {
        return await this.prisma.vacancy.findMany({
            where: { userId: id },
        });
    }

    async update(id: string, dto: UpdateVacancyDto) {
        return await this.prisma.vacancy.update({
            where: { id: id },
            data: {
                salary: dto.salary,
                minSalary: dto.minSalary,
                maxSalary: dto.maxSalary,
                currency: dto.currency,
                heading: dto.heading,
                description: dto.description,
                priority: dto.priority,
            },
        });
    }

    async remove(id: string) {
        return await this.prisma.vacancy.delete({ where: { id: id } });
    }
}
