import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { Roles } from "@/common/decorators/roles.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";
import { CreateMenuCategoryDto } from "@/modules/menu/dto/create-menu-category.dto";
import { CreateMenuItemDto } from "@/modules/menu/dto/create-menu-item.dto";
import { UpdateMenuCategoryDto } from "@/modules/menu/dto/update-menu-category.dto";
import { UpdateMenuItemDto } from "@/modules/menu/dto/update-menu-item.dto";
import { MenuService } from "@/modules/menu/menu.service";

@ApiTags("Menu")
@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get("items")
  @ApiOperation({ summary: "List active menu items for public browsing" })
  @ApiOkResponse({ description: "Active menu items returned." })
  findItems() {
    return this.menuService.findItems();
  }

  @Get("categories")
  @ApiOperation({ summary: "List public menu categories with active items" })
  @ApiOkResponse({ description: "Categories with active menu items returned." })
  findCategories() {
    return this.menuService.findCategories();
  }
}

@ApiTags("Admin Menu")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("STAFF", "MANAGER", "ADMIN")
@Controller("admin/menu")
export class AdminMenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get("items")
  @ApiOperation({ summary: "List all menu items for admin management" })
  @ApiOkResponse({ description: "All menu items returned." })
  @ApiUnauthorizedResponse({ description: "Missing or invalid JWT." })
  @ApiForbiddenResponse({ description: "User role cannot manage menu items." })
  findItems() {
    return this.menuService.findAdminItems();
  }

  @Post("items")
  @ApiOperation({ summary: "Create a menu item" })
  @ApiCreatedResponse({ description: "Menu item created." })
  @ApiBadRequestResponse({ description: "Invalid menu item payload." })
  @ApiUnauthorizedResponse({ description: "Missing or invalid JWT." })
  @ApiForbiddenResponse({ description: "User role cannot manage menu items." })
  createItem(@Body() dto: CreateMenuItemDto) {
    return this.menuService.createItem(dto);
  }

  @Patch("items/:id")
  @ApiOperation({ summary: "Update a menu item" })
  @ApiOkResponse({ description: "Menu item updated." })
  @ApiBadRequestResponse({ description: "Invalid menu item payload." })
  @ApiUnauthorizedResponse({ description: "Missing or invalid JWT." })
  @ApiForbiddenResponse({ description: "User role cannot manage menu items." })
  @ApiNotFoundResponse({ description: "Menu item or referenced category was not found." })
  updateItem(@Param("id") id: string, @Body() dto: UpdateMenuItemDto) {
    return this.menuService.updateItem(id, dto);
  }

  @Delete("items/:id")
  @ApiOperation({ summary: "Delete a menu item" })
  @ApiOkResponse({ description: "Menu item deleted." })
  @ApiUnauthorizedResponse({ description: "Missing or invalid JWT." })
  @ApiForbiddenResponse({ description: "User role cannot manage menu items." })
  @ApiNotFoundResponse({ description: "Menu item was not found." })
  deleteItem(@Param("id") id: string) {
    return this.menuService.deleteItem(id);
  }

  @Get("categories")
  @ApiOperation({ summary: "List all menu categories for admin management" })
  @ApiOkResponse({ description: "All menu categories returned." })
  @ApiUnauthorizedResponse({ description: "Missing or invalid JWT." })
  @ApiForbiddenResponse({ description: "User role cannot manage menu categories." })
  findCategories() {
    return this.menuService.findAdminCategories();
  }

  @Post("categories")
  @ApiOperation({ summary: "Create a menu category" })
  @ApiCreatedResponse({ description: "Menu category created." })
  @ApiBadRequestResponse({ description: "Invalid menu category payload." })
  @ApiUnauthorizedResponse({ description: "Missing or invalid JWT." })
  @ApiForbiddenResponse({ description: "User role cannot manage menu categories." })
  createCategory(@Body() dto: CreateMenuCategoryDto) {
    return this.menuService.createCategory(dto);
  }

  @Patch("categories/:id")
  @ApiOperation({ summary: "Update a menu category" })
  @ApiOkResponse({ description: "Menu category updated." })
  @ApiBadRequestResponse({ description: "Invalid menu category payload." })
  @ApiUnauthorizedResponse({ description: "Missing or invalid JWT." })
  @ApiForbiddenResponse({ description: "User role cannot manage menu categories." })
  @ApiNotFoundResponse({ description: "Menu category was not found." })
  updateCategory(@Param("id") id: string, @Body() dto: UpdateMenuCategoryDto) {
    return this.menuService.updateCategory(id, dto);
  }

  @Delete("categories/:id")
  @ApiOperation({ summary: "Delete a menu category" })
  @ApiOkResponse({ description: "Menu category deleted." })
  @ApiUnauthorizedResponse({ description: "Missing or invalid JWT." })
  @ApiForbiddenResponse({ description: "User role cannot manage menu categories." })
  @ApiNotFoundResponse({ description: "Menu category was not found." })
  deleteCategory(@Param("id") id: string) {
    return this.menuService.deleteCategory(id);
  }
}
