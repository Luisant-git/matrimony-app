import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { Gender } from '@prisma/client';

@ApiTags('Users') // Grouping the controller in Swagger UI
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' }) // Swagger summary for this endpoint
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('data')
  @ApiOperation({ summary: 'Retrieve all users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Active users only'})
  activeUsers() {
    return this.userService.activeUsers();
  }

  @Get('data/:id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('data/:id')
  @ApiOperation({ summary: 'Update a user by ID' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('data/:id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login with mobile number' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        access_token: 'jwt_token_here',
        user: {
          userId: 'uuid',
          mobileNo: '1234567890',
          password: 'hashed_password',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto.mobileNo, loginDto.password);
  }

  @Get('filter')
  async getFilteredUsers(
    @Query('gender') gender: Gender,
    @Query('communityId') communityId: string,
    @Query('casteId') casteId: string,
    @Query('subCasteId') subCasteId: string,
    @Query('kulamId') kulamId: string,
    @Query('kothiramId') kothiramId: string,
    @Query('lagnam') lagnam: string,
    @Query('dosham') dosham: string,
    @Query('natchathiram') natchathiram?: string,
    @Query('rasi') rasi?: string, // Add rasi as a query parameter
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '10',
  ) {
    // Parse `page` and `pageSize` to numbers
    const pageNumber = parseInt(page, 10) || 1; // Default to 1 if parsing fails
    const pageSizeNumber = parseInt(pageSize, 10) || 10; // Default to 10 if parsing fails
    const doshamArray = dosham ? dosham.split(',') : undefined; // Convert to array
    const natchathiramArray = natchathiram
      ? natchathiram.split(',')
      : undefined; // Convert to array

    return this.userService.filterUsers({
      gender,
      communityId,
      casteId,
      subCasteId,
      kulamId,
      kothiramId,
      lagnam,
      dosham: doshamArray,
      natchathiram: natchathiramArray,
      rasi,
      page: pageNumber,
      pageSize: pageSizeNumber,
    });
  }
}
