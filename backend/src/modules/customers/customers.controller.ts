import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Customers")
@Controller("admin/customers")
export class CustomersController {
  @Get()
  findAll() {
    return [];
  }
}
