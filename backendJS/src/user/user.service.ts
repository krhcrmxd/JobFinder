import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "src/prisma.service";
import errorHandler from "src/utils/errorHandler";
import { CreateUserDto, UpdateUserDto } from "./user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async getUserById(userId: string) {
        try {
            return await this.prisma.user.findUnique({
                where: { id: userId },
                include: { CV: true, vacancies: true, orders: true },
            });
        } catch (e) {
            errorHandler(e);
        }
    }
    async getUserByEmail(email: string) {
        try {
            return await this.prisma.user.findUnique({
                where: { email: email },
                include: { CV: true, vacancies: true, orders: true },
            });
        } catch (e) {
            errorHandler(e);
        }
    }
    async createUser(dto: CreateUserDto) {
        try {
            return await this.prisma.user.create({
                data: {
                    name: dto.name,
                    surname: dto.surname,
                    email: dto.email,
                    password: dto.password,
                    roles: dto.roles,
                },
            });
        } catch (e) {
            errorHandler(e);
        }
    }
    async deleteUser(id: string) {
        try {
            return await this.prisma.user.delete({
                where: { id: id },
            });
        } catch (e) {
            errorHandler(e);
        }
    }
    async updateUser(dto: UpdateUserDto, id: string) {
        try {
            if (dto.password) {
                dto.password = await bcrypt.hash(dto.password, 5);
            }
            return await this.prisma.user.update({
                where: { id: id },
                data: {
                    name: dto.name,
                    surname: dto.surname,
                    email: dto.email,
                    password: dto.password,
                    roles: dto.roles,
                },
            });
        } catch (e) {
            errorHandler(e);
        }
    }
}
