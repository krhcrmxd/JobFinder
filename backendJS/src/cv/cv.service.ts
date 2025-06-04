import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateCvDto, UpdateCvDto } from "./cv.dto";

@Injectable()
export class CvService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateCvDto) {
        return await this.prisma.cV.create({
            data: {
                content: dto.content,
                userID: dto.userId,
            },
        });
    }

    async findAll() {
        return await this.prisma.cV.findMany();
    }

    async findOne(id: string) {
        const cv = await this.prisma.cV.findUnique({ where: { id } });
        if (!cv) throw new NotFoundException("CV not found");
        return cv;
    }

    async findByApplication(applicationId: string) {
        return await this.prisma.cV.findMany({
            where: {
                applications: {
                    some: {
                        id: applicationId,
                    },
                },
            },
        });
    }

    async update(id: string, dto: UpdateCvDto) {
        return await this.prisma.cV.update({
            where: { userID: id },
            data: { content: dto.content },
        });
    }

    async remove(id: string) {
        return await this.prisma.cV.delete({ where: { id } });
    }
}
