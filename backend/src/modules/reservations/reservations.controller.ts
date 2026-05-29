import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Reservations")
@Controller("admin/reservations")
export class ReservationsController {
  @Get()
  findAll() {
    return [];
  }
}
