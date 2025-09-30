import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommunityDto } from './dto/create-update.dto';


@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCommunityDto: CreateCommunityDto) {
    return this.prisma.community.create({ data: createCommunityDto });
  }

  findAll() {
    return this.prisma.community.findMany();
  }

  findOne(id: string) {
    return this.prisma.community.findUnique({ where: { communityId: id } });
  }

  update(id: string, updateCommunityDto: CreateCommunityDto) {
    return this.prisma.community.update({ where: { communityId: id }, data: updateCommunityDto });
  }

  remove(id: string) {
    return this.prisma.community.delete({ where: { communityId: id } });
  }
}
