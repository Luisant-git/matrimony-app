import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CasteService } from './caste.service';
import { CreateCasteDto } from './dto/create.dto';


@ApiTags('Caste')
@Controller('caste')
export class CasteController {
  constructor(private readonly casteService: CasteService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new caste' })
  create(@Body() createCasteDto: CreateCasteDto) {
    return this.casteService.create(createCasteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all castes' })
  findAll() {
    return this.casteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a caste by ID' })
  @ApiParam({ name: 'id', description: 'Unique ID of the caste' })
  findOne(@Param('id') id: string) {
    return this.casteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a caste by ID' })
  @ApiParam({ name: 'id', description: 'Unique ID of the caste' })
  update(@Param('id') id: string, @Body() updateCasteDto: CreateCasteDto) {
    return this.casteService.update(id, updateCasteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a caste by ID' })
  @ApiParam({ name: 'id', description: 'Unique ID of the caste' })
  remove(@Param('id') id: string) {
    return this.casteService.remove(id);
  }
}
