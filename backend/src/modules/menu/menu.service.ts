import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { CreateMenuCategoryDto } from "@/modules/menu/dto/create-menu-category.dto";
import { CreateMenuItemDto } from "@/modules/menu/dto/create-menu-item.dto";
import { UpdateMenuCategoryDto } from "@/modules/menu/dto/update-menu-category.dto";
import { UpdateMenuItemDto } from "@/modules/menu/dto/update-menu-item.dto";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  findItems() {
    return this.prisma.menuItem.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        imageUrl: true,
        isFeatured: true,
        sortOrder: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            sortOrder: true,
          },
        },
      },
      orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }, { name: "asc" }],
    });
  }

  findCategories() {
    return this.prisma.menuCategory.findMany({
      where: {
        items: {
          some: { isActive: true },
        },
      },
      include: {
        items: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            price: true,
            imageUrl: true,
            isFeatured: true,
            sortOrder: true,
          },
          orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        },
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
  }

  findAdminItems() {
    return this.prisma.menuItem.findMany({
      include: { category: true },
      orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }, { name: "asc" }],
    });
  }

  findAdminCategories() {
    return this.prisma.menuCategory.findMany({
      include: {
        _count: {
          select: { items: true },
        },
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
  }

  async createCategory(dto: CreateMenuCategoryDto) {
    try {
      return await this.prisma.menuCategory.create({
        data: {
          name: dto.name,
          slug: dto.slug,
          sortOrder: dto.sortOrder ?? 0,
        },
      });
    } catch (error) {
      this.handleKnownPrismaError(error, "Menu category");
    }
  }

  async updateCategory(id: string, dto: UpdateMenuCategoryDto) {
    try {
      return await this.prisma.menuCategory.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      this.handleKnownPrismaError(error, "Menu category");
    }
  }

  async deleteCategory(id: string) {
    try {
      return await this.prisma.menuCategory.delete({
        where: { id },
      });
    } catch (error) {
      this.handleKnownPrismaError(error, "Menu category");
    }
  }

  async createItem(dto: CreateMenuItemDto) {
    try {
      return await this.prisma.menuItem.create({
        data: {
          categoryId: dto.categoryId,
          name: dto.name,
          slug: dto.slug,
          description: dto.description,
          price: dto.price,
          imageUrl: dto.imageUrl,
          isActive: dto.isActive ?? true,
          isFeatured: dto.isFeatured ?? false,
          sortOrder: dto.sortOrder ?? 0,
        },
        include: { category: true },
      });
    } catch (error) {
      this.handleKnownPrismaError(error, "Menu item");
    }
  }

  async updateItem(id: string, dto: UpdateMenuItemDto) {
    try {
      return await this.prisma.menuItem.update({
        where: { id },
        data: dto,
        include: { category: true },
      });
    } catch (error) {
      this.handleKnownPrismaError(error, "Menu item");
    }
  }

  async deleteItem(id: string) {
    try {
      return await this.prisma.menuItem.delete({
        where: { id },
      });
    } catch (error) {
      this.handleKnownPrismaError(error, "Menu item");
    }
  }

  private handleKnownPrismaError(error: unknown, label: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new ConflictException(`${label} with this unique value already exists.`);
      }

      if (error.code === "P2003") {
        throw new NotFoundException("Referenced menu category was not found.");
      }

      if (error.code === "P2025") {
        throw new NotFoundException(`${label} was not found.`);
      }
    }

    throw error;
  }
}
