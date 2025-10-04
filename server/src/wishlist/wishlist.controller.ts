import { Controller, Post, Get, Delete, Body, Query, Param } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Wishlist')
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  @ApiOperation({ summary: 'Add an item to the wishlist' })
  @ApiResponse({ status: 201, description: 'Item added to wishlist' })
  @ApiResponse({ status: 409, description: 'Item already in wishlist' })
  async createWishlist(@Body() createWishlistDto: CreateWishlistDto) {
    return await this.wishlistService.createWishlist(createWishlistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all wishlist items for a user' })
  @ApiResponse({ status: 200, description: 'Returns wishlist items' })
  async getWishlistByUser(@Query('userId') userId: string) {
    return await this.wishlistService.getWishlistByUser(userId);
  }

  @Delete(':wishlistId')
  @ApiOperation({ summary: 'Remove an item from the wishlist by ID' })
  @ApiResponse({ status: 200, description: 'Item removed from wishlist' })
  async deleteWishlist(@Param('wishlistId') wishlistId: string) {
    return await this.wishlistService.deleteWishlist(wishlistId);
  }

  @Delete()
  @ApiOperation({ summary: 'Remove an item from the wishlist by userId and profileId' })
  @ApiResponse({ status: 200, description: 'Item removed from wishlist' })
  async removeFromWishlist(@Body() body: { userId: string; profileId: string }) {
    return await this.wishlistService.removeFromWishlist(body.userId, body.profileId);
  }
}
