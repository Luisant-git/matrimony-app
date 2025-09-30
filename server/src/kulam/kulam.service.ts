// src/kulam/kulam.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateKulamDto, UpdateKulamDto } from './dto/create-kulam.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KulamService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createKulamDto: CreateKulamDto) {
    const { name, subCasteId } = createKulamDto;
    return this.prisma.kulam.create({
      data: {
        name,
        subCasteId,
      },
    });
  }

  async findAll() {
    return this.prisma.kulam.findMany();
  }

  async findOne(id: string) {
    const kulam = await this.prisma.kulam.findUnique({
      where: { kulamId: id },
    });

    if (!kulam) {
      throw new NotFoundException(`Kulam with ID ${id} not found`);
    }

    return kulam;
  }

  async update(id: string, updateKulamDto: UpdateKulamDto) {
    const existingKulam = await this.findOne(id);
    
    return this.prisma.kulam.update({
      where: { kulamId: id },
      data: {
        name: updateKulamDto.name || existingKulam.name,
        subCasteId: updateKulamDto.subCasteId || existingKulam.subCasteId,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);  // Ensure the Kulam exists before attempting to delete

    return this.prisma.kulam.delete({
      where: { kulamId: id },
    });
  }
}
