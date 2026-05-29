import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "@/modules/auth/auth.module";
import { CustomersModule } from "@/modules/customers/customers.module";
import { HealthModule } from "@/modules/health/health.module";
import { MenuModule } from "@/modules/menu/menu.module";
import { OrdersModule } from "@/modules/orders/orders.module";
import { PaymentsModule } from "@/modules/payments/payments.module";
import { PrismaModule } from "@/prisma/prisma.module";
import { PromotionsModule } from "@/modules/promotions/promotions.module";
import { ReportsModule } from "@/modules/reports/reports.module";
import { ReservationsModule } from "@/modules/reservations/reservations.module";
import { SettingsModule } from "@/modules/settings/settings.module";
import { UploadsModule } from "@/modules/uploads/uploads.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    AuthModule,
    MenuModule,
    OrdersModule,
    ReservationsModule,
    PromotionsModule,
    CustomersModule,
    ReportsModule,
    SettingsModule,
    UploadsModule,
    PaymentsModule,
  ],
})
export class AppModule {}
