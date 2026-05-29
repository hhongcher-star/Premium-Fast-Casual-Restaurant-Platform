import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { type SignOptions } from "jsonwebtoken";

import { LoginDto } from "@/modules/auth/dto/login.dto";
import { PrismaService } from "@/prisma/prisma.service";

type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async customerLogin(dto: LoginDto) {
    const user = await this.validateCredentials(dto);

    if (user.role !== UserRole.CUSTOMER) {
      throw new ForbiddenException("This account is not a customer account.");
    }

    return this.issueTokens(user);
  }

  async adminLogin(dto: LoginDto) {
    const user = await this.validateCredentials(dto);
    const allowedRoles: UserRole[] = [UserRole.STAFF, UserRole.MANAGER, UserRole.ADMIN];

    if (!allowedRoles.includes(user.role)) {
      throw new ForbiddenException("This account cannot access the admin dashboard.");
    }

    return this.issueTokens(user);
  }

  async validateCredentials(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    return user;
  }

  async issueTokens(user: { id: string; email: string; name: string; role: UserRole }) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessExpiresIn =
      this.config.get<SignOptions["expiresIn"]>("JWT_ACCESS_EXPIRES_IN") ?? "15m";
    const refreshExpiresIn =
      this.config.get<SignOptions["expiresIn"]>("JWT_REFRESH_EXPIRES_IN") ?? "7d";

    const accessToken = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>("JWT_ACCESS_SECRET"),
      expiresIn: accessExpiresIn,
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>("JWT_REFRESH_SECRET"),
      expiresIn: refreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  validateUser(payload: unknown) {
    return payload;
  }
}
