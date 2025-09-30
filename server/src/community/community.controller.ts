import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-update.dto';


@ApiTags('Community')
@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new community' })
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communityService.create(createCommunityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all communities' })
  findAll() {
    return this.communityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a community by ID' })
  @ApiParam({ name: 'id', description: 'Unique ID of the community' })
  findOne(@Param('id') id: string) {
    return this.communityService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a community by ID' })
  @ApiParam({ name: 'id', description: 'Unique ID of the community' })
  update(@Param('id') id: string, @Body() updateCommunityDto: CreateCommunityDto) {
    return this.communityService.update(id, updateCommunityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a community by ID' })
  @ApiParam({ name: 'id', description: 'Unique ID of the community' })
  remove(@Param('id') id: string) {
    return this.communityService.remove(id);
  }
}
