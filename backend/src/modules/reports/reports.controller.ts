import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Reports")
@Controller("admin/reports")
export class ReportsController {
  @Get("summary")
  summary() {
    return {};
  }
}
