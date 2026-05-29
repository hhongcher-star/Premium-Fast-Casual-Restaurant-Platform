import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { Roles } from "@/common/decorators/roles.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";
import { UploadsService } from "@/modules/uploads/uploads.service";

type MultipartFile = {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size: number;
};

@ApiTags("Uploads")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("STAFF", "MANAGER", "ADMIN")
@Controller("admin/uploads")
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post("menu-items/image")
  @ApiOperation({ summary: "Upload a menu item image to Cloudinary" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
      required: ["file"],
    },
  })
  @ApiCreatedResponse({
    description: "Menu item image uploaded successfully.",
    schema: {
      example: {
        url: "https://res.cloudinary.com/demo/image/upload/v123/tasteful-table/menu-items/file.png",
        publicId: "tasteful-table/menu-items/file",
        width: 1200,
        height: 800,
        format: "png",
        bytes: 148641,
        originalName: "file.png",
      },
    },
  })
  @ApiBadRequestResponse({ description: "Missing file, invalid field name, non-image file, or file too large." })
  @ApiUnauthorizedResponse({ description: "Missing or invalid JWT." })
  @ApiForbiddenResponse({ description: "User role cannot upload menu images." })
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  uploadMenuItemImage(@UploadedFile() file?: MultipartFile) {
    return this.uploadsService.uploadMenuItemImage(file);
  }
}
