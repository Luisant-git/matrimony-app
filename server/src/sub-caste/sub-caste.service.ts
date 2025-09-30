import { Injectable } from '@nestjs/common';
import { CreateSubCasteDto } from './dto/create-sub-caste.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class SubCasteService {
  constructor(private prisma: PrismaService) {}

  async create(createSubCasteDto: CreateSubCasteDto) {
    const { subCasteName, casteId } = createSubCasteDto;

    return this.prisma.sub_caste.create({
      data: {
        SubCasteName: subCasteName,
        CasteId: casteId,
      },
    });
  }

  async findAll() {
    return this.prisma.sub_caste.findMany({
      include: { subCaste: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.sub_caste.findUnique({
      where: { subCasteId: id },
      include: { subCaste: true },
    });
  }

  async update(id: string, updateSubCasteDto: Partial<CreateSubCasteDto>) {
    const { subCasteName, casteId } = updateSubCasteDto;

    return this.prisma.sub_caste.update({
      where: { subCasteId: id },
      data: {
        ...(subCasteName && { SubCasteName: subCasteName }),
        ...(casteId && { CasteId: casteId }),
      },
    });
  }


  async remove(id: string) {
    return this.prisma.sub_caste.delete({
      where: { subCasteId: id },
    });
  }
}
