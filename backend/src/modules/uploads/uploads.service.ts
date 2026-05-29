import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "node:stream";

type UploadedFile = {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size: number;
};

@Injectable()
export class UploadsService {
  constructor(private readonly config: ConfigService) {
    cloudinary.config({
      cloud_name: this.cloudName,
      api_key: this.apiKey,
      api_secret: this.apiSecret,
    });
  }

  async uploadMenuItemImage(file?: UploadedFile) {
    if (!this.hasCloudinaryConfig()) {
      throw new InternalServerErrorException("Cloudinary configuration missing");
    }

    if (!file) {
      throw new BadRequestException("Image file is required.");
    }

    if (!file.mimetype.startsWith("image/")) {
      throw new BadRequestException("Only image uploads are allowed.");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException("Image must be 5MB or smaller.");
    }

    const result = await this.uploadBuffer(file);

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      originalName: file.originalname,
    };
  }

  private get cloudName() {
    return this.config.get<string>("CLOUDINARY_CLOUD_NAME");
  }

  private get apiKey() {
    return this.config.get<string>("CLOUDINARY_API_KEY");
  }

  private get apiSecret() {
    return this.config.get<string>("CLOUDINARY_API_SECRET");
  }

  private hasCloudinaryConfig() {
    return Boolean(this.cloudName && this.apiKey && this.apiSecret);
  }

  private uploadBuffer(file: UploadedFile): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: "tasteful-table/menu-items",
          resource_type: "image",
          use_filename: true,
          unique_filename: true,
          overwrite: false,
        },
        (error, result) => {
          if (error) {
            reject(new InternalServerErrorException(error.message));
            return;
          }

          if (!result) {
            reject(new InternalServerErrorException("Cloudinary upload failed."));
            return;
          }

          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(upload);
    });
  }
}
