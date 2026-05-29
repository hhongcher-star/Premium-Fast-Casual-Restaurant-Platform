import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Settings")
@Controller("admin/settings")
export class SettingsController {
  @Get()
  find() {
    return {};
  }
}
