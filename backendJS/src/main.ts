import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function main() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.setGlobalPrefix("/api/v1");
    app.useGlobalPipes(new ValidationPipe());

    app.enableCors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true,
    });

    await app.listen(process.env.PORT ?? 4200);
}
main();
