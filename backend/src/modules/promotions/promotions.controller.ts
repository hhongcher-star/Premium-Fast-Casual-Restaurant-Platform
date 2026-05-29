import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Promotions")
@Controller("admin/promotions")
export class PromotionsController {
  @Get()
  findAll() {
    return [];
  }
}
