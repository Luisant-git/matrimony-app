import { Injectable, ConflictException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  async createWishlist(createWishlistDto: CreateWishlistDto) {
    try {
      // Check if already exists
      const existing = await this.prisma.wishlist.findFirst({
        where: {
          userId: createWishlistDto.userId,
          userWishlistId: createWishlistDto.profileId,
        },
      });
      
      if (existing) {
        throw new ConflictException('This profile is already in your wishlist.');
      }

      const result = await this.prisma.wishlist.create({
        data: {
          userId: createWishlistDto.userId,
          userWishlistId: createWishlistDto.profileId,
        },
      });
      
      return {
        ...result,
        profileId: result.userWishlistId
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('This profile is already in your wishlist.');
      }
      throw error;
    }
  }

  async getWishlistByUser(userId: string) {
    const wishlist = await this.prisma.wishlist.findMany({
      where: { userId },
    });
    // Map userWishlistId to profileId for frontend compatibility
    return wishlist.map(item => ({
      ...item,
      profileId: item.userWishlistId
    }));
  }

  async deleteWishlist(wishlistId: string) {
    return await this.prisma.wishlist.delete({
      where: { wishlistId },
    });
  }

  async removeFromWishlist(userId: string, profileId: string) {
    return await this.prisma.wishlist.deleteMany({
      where: {
        userId,
        userWishlistId: profileId,
      },
    });
  }
}
