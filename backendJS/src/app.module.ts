import { Module } from "@nestjs/common";
import { ApplicationModule } from "./application/application.module";
import { AuthModule } from "./auth/auth.module";
import { CvModule } from "./cv/cv.module";
import { OrderModule } from "./order/order.module";
import { UserModule } from "./user/user.module";
import { VacancyModule } from "./vacancy/vacancy.module";

@Module({
    imports: [UserModule, AuthModule, VacancyModule, CvModule, ApplicationModule, OrderModule],
})
export class AppModule {}
