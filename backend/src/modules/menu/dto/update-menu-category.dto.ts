import { PartialType } from "@nestjs/swagger";

import { CreateMenuCategoryDto } from "@/modules/menu/dto/create-menu-category.dto";

export class UpdateMenuCategoryDto extends PartialType(CreateMenuCategoryDto) {}
