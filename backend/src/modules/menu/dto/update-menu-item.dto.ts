import { PartialType } from "@nestjs/swagger";

import { CreateMenuItemDto } from "@/modules/menu/dto/create-menu-item.dto";

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {}
