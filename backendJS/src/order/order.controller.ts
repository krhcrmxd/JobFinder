import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import errorHandler from "src/utils/errorHandler";
import { getIdFromReq } from "src/utils/getUserIdFromReq.util";
import { CreateOrderDto, UpdateOrderDto } from "./order.dto";
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private Jwt: JwtService,
    ) {}

    @Post()
    @UseGuards(AuthGuard("jwt"))
    async create(@Body() createOrderDto: CreateOrderDto) {
        try {
            return this.orderService.createOrder(createOrderDto);
        } catch (e) {
            errorHandler(e);
        }
    }

    @Get()
    async findAll() {
        try {
            return this.orderService.getOrders();
        } catch (e) {
            errorHandler(e);
        }
    }

    @Get("/bu")
    @UseGuards(AuthGuard("jwt"))
    async bu(@Req() req: Request) {
        try {
            const userId = await getIdFromReq(req, this.Jwt);
            return this.orderService.findByUser(userId);
        } catch (e) {
            errorHandler(e);
        }
    }

    @Get("/search")
    async search(@Query("query") query: string) {
        try {
            return this.orderService.findByHeading(query);
        } catch (e) {
            errorHandler(e);
        }
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        try {
            return this.orderService.getOrderById(id);
        } catch (e) {
            errorHandler(e);
        }
    }

    @Patch(":id")
    @UseGuards(AuthGuard("jwt"))
    async update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
        try {
            return this.orderService.updateOrder(id, updateOrderDto);
        } catch (e) {
            errorHandler(e);
        }
    }

    @Delete(":id")
    @UseGuards(AuthGuard("jwt"))
    async remove(@Param("id") id: string) {
        try {
            return this.orderService.deleteOrder(id);
        } catch (e) {
            errorHandler(e);
        }
    }
}
