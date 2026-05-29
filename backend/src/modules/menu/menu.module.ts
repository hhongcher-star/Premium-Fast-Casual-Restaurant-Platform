import { Module } from "@nestjs/common";

import { AdminMenuController, MenuController } from "@/modules/menu/menu.controller";
import { MenuService } from "@/modules/menu/menu.service";

@Module({
  controllers: [MenuController, AdminMenuController],
  providers: [MenuService],
})
export class MenuModule {}
