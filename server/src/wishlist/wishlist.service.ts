import { Injectable, ConflictException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async createWishlist(createWishlistDto: CreateWishlistDto) {
    try {
      return await this.prisma.wishlist.create({
        data: createWishlistDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Prisma unique constraint violation
        throw new ConflictException('This item is already in the wishlist.');
      }
      throw error;
    }
  }

  async getWishlistByUser(userId: string) {
    return await this.prisma.wishlist.findMany({
      where: { userId },
    });
  }

  async deleteWishlist(wishlistId: string) {
    return await this.prisma.wishlist.delete({
      where: { wishlistId },
    });
  }
}
