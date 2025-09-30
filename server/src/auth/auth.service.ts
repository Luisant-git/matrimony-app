import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Role } from '@prisma/client'; // Import the Role enum
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(email: string, password: string, role: Role): Promise<any> {
    const existingAdmin = await this.prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await this.prisma.admin.create({
      data: { email, password: hashedPassword, role }, // Ensure role is of type Role
    });

    return { message: 'Registration successful', admin };
  }

  async login(email: string, password: string): Promise<any> {
    const admin = await this.prisma.admin.findUnique({ where: { email } });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: admin.userId, email: admin.email, role: admin.role };
    const token = this.jwtService.sign(payload);

    return { accessToken: token, role: admin.role };
  }
}
