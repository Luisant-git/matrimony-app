import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCasteDto } from './dto/create.dto';


@Injectable()
export class CasteService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCasteDto: CreateCasteDto) {
    return this.prisma.caste.create({ data: createCasteDto });
  }

  findAll() {
    return this.prisma.caste.findMany();
  }

  findOne(id: string) {
    return this.prisma.caste.findUnique({ where: { casteId: id } });
  }

  update(id: string, updateCasteDto: CreateCasteDto) {
    return this.prisma.caste.update({ where: { casteId: id }, data: updateCasteDto });
  }

  remove(id: string) {
    return this.prisma.caste.delete({ where: { casteId: id } });
  }
}
