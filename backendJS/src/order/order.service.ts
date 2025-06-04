import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateOrderDto, UpdateOrderDto } from "./order.dto";

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async createOrder(dto: CreateOrderDto) {
        return await this.prisma.order.create({
            data: {
                payment: dto.payment,
                currency: dto.currency,
                heading: dto.heading,
                description: dto.description,
                priority: dto.priority,
                userId: dto.userId,
            },
        });
    }

    async getOrders() {
        return await this.prisma.order.findMany();
    }

    async findByHeading(query: string) {
        return await this.prisma.order.findMany({
            where: {
                heading: {
                    contains: query,
                    mode: "insensitive",
                },
            },
        });
    }

    async findByUser(id: string) {
        return await this.prisma.order.findMany({
            where: { userId: id },
        });
    }

    async getOrderById(id: string) {
        return await this.prisma.order.findUnique({ where: { id: id } });
    }

    async updateOrder(id: string, dto: UpdateOrderDto) {
        return await this.prisma.order.update({
            where: { id: id },
            data: {
                payment: dto.payment,
                currency: dto.currency,
                heading: dto.heading,
                description: dto.description,
                priority: dto.priority,
            },
        });
    }

    async deleteOrder(id: string) {
        return await this.prisma.order.delete({ where: { id: id } });
    }
}
