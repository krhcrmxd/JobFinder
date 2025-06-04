import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { getJwtConfig } from "src/jwt/jwt.config";
import { JwtStrategy } from "src/jwt/jwt.strategy";
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/user/user.service";
import { CvController } from "./cv.controller";
import { CvService } from "./cv.service";

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig,
        }),
    ],
    controllers: [CvController],
    providers: [CvService, PrismaService, JwtStrategy, UserService],
})
export class CvModule {}
