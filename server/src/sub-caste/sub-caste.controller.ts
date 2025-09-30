import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SubCasteService } from './sub-caste.service';
import { CreateSubCasteDto } from './dto/create-sub-caste.dto';

@ApiTags('Sub-Caste') // Swagger tag to group related endpoints
@Controller('sub-caste')
export class SubCasteController {
  constructor(private readonly subCasteService: SubCasteService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sub-caste' }) // Describe the operation
  @ApiResponse({ status: 201, description: 'The sub-caste has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createSubCasteDto: CreateSubCasteDto) {
    return this.subCasteService.create(createSubCasteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all sub-castes' })
  @ApiResponse({ status: 200, description: 'Return all sub-castes.' })
  findAll() {
    return this.subCasteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific sub-caste by ID' })
  @ApiResponse({ status: 200, description: 'Return a specific sub-caste.' })
  @ApiResponse({ status: 404, description: 'Sub-caste not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the sub-caste to retrieve' })
  findOne(@Param('id') id: string) {
    return this.subCasteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific sub-caste by ID' })
  @ApiResponse({ status: 200, description: 'The sub-caste has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Sub-caste not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the sub-caste to update' })
  update(@Param('id') id: string, @Body() updateSubCasteDto: CreateSubCasteDto) {
    return this.subCasteService.update(id, updateSubCasteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific sub-caste by ID' })
  @ApiResponse({ status: 200, description: 'The sub-caste has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Sub-caste not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the sub-caste to delete' })
  remove(@Param('id') id: string) {
    return this.subCasteService.remove(id);
  }
}
