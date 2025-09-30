import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KothiramService } from './kothiram.service';
import { CreateKothiramDto } from './dto/create-kothiram.dto';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Kothirams')
@Controller('kothirams')
export class KothiramController {
  constructor(private readonly kothiramService: KothiramService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Kothiram' })
  @ApiResponse({ status: 201, description: 'The Kothiram has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  create(@Body() createKothiramDto: CreateKothiramDto) {
    return this.kothiramService.create(createKothiramDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all Kothirams' })
  @ApiResponse({ status: 200, description: 'List of all Kothirams.' })
  findAll() {
    return this.kothiramService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific Kothiram by ID' })
  @ApiResponse({ status: 200, description: 'The Kothiram details.' })
  @ApiResponse({ status: 404, description: 'Kothiram not found.' })
  findOne(@Param('id') id: string) {
    return this.kothiramService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific Kothiram by ID' })
  @ApiResponse({ status: 200, description: 'The Kothiram has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Kothiram not found.' })
  update(@Param('id') id: string, @Body() updateKothiramDto: CreateKothiramDto) {
    return this.kothiramService.update(id, updateKothiramDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific Kothiram by ID' })
  @ApiResponse({ status: 200, description: 'The Kothiram has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Kothiram not found.' })
  remove(@Param('id') id: string) {
    return this.kothiramService.remove(id);
  }
}
