// src/kulam/kulam.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { KulamService } from './kulam.service';
import { CreateKulamDto, UpdateKulamDto } from './dto/create-kulam.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Kulams') // This will create a section in Swagger UI for Kulam
@Controller('kulams')
export class KulamController {
  constructor(private readonly kulamService: KulamService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Kulam' })
  @ApiResponse({ status: 201, description: 'The Kulam has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createKulamDto: CreateKulamDto) {
    return this.kulamService.create(createKulamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Kulams' })
  @ApiResponse({ status: 200, description: 'List of all Kulams.' })
  findAll() {
    return this.kulamService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Kulam by ID' })
  @ApiResponse({ status: 200, description: 'The Kulam found by the ID.' })
  @ApiResponse({ status: 404, description: 'Kulam not found' })
  findOne(@Param('id') id: string) {
    return this.kulamService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Kulam by ID' })
  @ApiResponse({ status: 200, description: 'The Kulam has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Kulam not found' })
  update(@Param('id') id: string, @Body() updateKulamDto: UpdateKulamDto) {
    return this.kulamService.update(id, updateKulamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Kulam by ID' })
  @ApiResponse({ status: 200, description: 'The Kulam has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Kulam not found' })
  remove(@Param('id') id: string) {
    return this.kulamService.remove(id);
  }
}
