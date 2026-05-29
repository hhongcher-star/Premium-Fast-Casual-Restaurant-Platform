import { Module } from "@nestjs/common";

import { PromotionsController } from "@/modules/promotions/promotions.controller";
import { PromotionsService } from "@/modules/promotions/promotions.service";

@Module({
  controllers: [PromotionsController],
  providers: [PromotionsService],
})
export class PromotionsModule {}
