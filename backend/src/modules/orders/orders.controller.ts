import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Orders")
@Controller("admin/orders")
export class OrdersController {
  @Get()
  findAll() {
    return [];
  }
}
