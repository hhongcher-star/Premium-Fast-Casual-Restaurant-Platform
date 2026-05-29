import { Module } from "@nestjs/common";

import { ReservationsController } from "@/modules/reservations/reservations.controller";
import { ReservationsService } from "@/modules/reservations/reservations.service";

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
