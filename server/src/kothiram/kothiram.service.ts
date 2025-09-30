import { Injectable } from '@nestjs/common';

import { CreateKothiramDto } from './dto/create-kothiram.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class KothiramService {
  constructor(private prisma: PrismaService) {}

  create(createKothiramDto: CreateKothiramDto) {
    return this.prisma.kothiram.create({
      data: createKothiramDto,
    });
  }

  findAll() {
    return this.prisma.kothiram.findMany();
  }

  findOne(id: string) {
    return this.prisma.kothiram.findUnique({
      where: { kothiramId: id },
    });
  }

  update(id: string, updateKothiramDto: CreateKothiramDto) {
    return this.prisma.kothiram.update({
      where: { kothiramId: id },
      data: updateKothiramDto,
    });
  }

  remove(id: string) {
    return this.prisma.kothiram.delete({
      where: { kothiramId: id },
    });
  }
}
