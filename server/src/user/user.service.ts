import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Gender } from '@prisma/client';


@Injectable()
export class UserService {
 
  constructor(private readonly prisma: PrismaService,private readonly jwtService: JwtService,) {}

  async create(createUserDto: any) {
    const { siblings, jathagam, password, ...userData } = createUserDto;
  
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
  
    return this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        siblings: {
          create: siblings,
        },
        jathagam: {
          create: jathagam,
        },
      },
      include: {
        siblings: true,
        jathagam: true,
      },
    });
  }
  
  

  async findAll() {
    return this.prisma.user.findMany(
      {
        include:{
          siblings:true,
          jathagam:true,
          wishlists:true
        }
      }
    );
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { userId: id } ,include:{
      siblings:true,
      jathagam:true
    }});
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: any) {
    const user = await this.findOne(id);
    
    return this.prisma.user.update({
      where: { userId: id },
      data: {
        regNo: updateUserDto?.regNo,
        fullName: updateUserDto?.fullName,
        mobileNo: updateUserDto?.mobileNo,
        email: updateUserDto?.email,
        password: updateUserDto?.password,
        gender: updateUserDto?.gender,
        dateOfBirth: updateUserDto?.dateOfBirth,
        state: updateUserDto.state,
        district: updateUserDto?.district,
        address: updateUserDto?.address,
        profile: updateUserDto?.profile,
        birthTime: updateUserDto?.birthTime,
        userProfile: updateUserDto?.userProfile,
        birthPlace: updateUserDto?.birthPlace,
        education: updateUserDto?.education,
        job: updateUserDto?.job,
        job_type: updateUserDto?.job_type,
        organization: updateUserDto?.organization,
        height: updateUserDto?.height,
        weight: updateUserDto?.weight,
        color: updateUserDto?.color,
        income: updateUserDto?.income,
        kulam: updateUserDto?.kulam,
        kothiram: updateUserDto?.kothiram,
        poorvigam: updateUserDto?.poorvigam,
        maritalStatus: updateUserDto?.maritalStatus,
        ownHouse: updateUserDto?.ownHouse,
        casteId: updateUserDto?.casteId,
        subCasteId: updateUserDto?.subCasteId,
        communityId: updateUserDto?.communityId,
        kulamId: updateUserDto?.kulamId,
        kothiramId: updateUserDto?.kothiramId,
        isActive: updateUserDto?.isActive,
        updatedAt: new Date(),
        siblings: {
          update: updateUserDto.siblings?.update || [],
          create: updateUserDto.siblings?.create || [],
        },
        jathagam: {
          update: updateUserDto.jathagam?.map(jathagam => ({
            where: { jathagamId: jathagam.jathagamId },
            data: {
              rasi: jathagam.rasi,
              uploadJathakam: jathagam.uploadJathakam,
              natchathiram: jathagam.natchathiram,
              lagnam: jathagam.lagnam,
              dosham: jathagam.dosham,
            },
          })) || [],
          create: updateUserDto.jathagam?.filter(jathagam => !jathagam.jathagamId) || [],
        },
      },
    });
  }
  

  async remove(id: string) {
    // Delete related Sibling records
    await this.prisma.sibling.deleteMany({
      where: { userId: id },
    });
  
    // Delete related Jathagam records (if still needed)
    await this.prisma.jathagam.deleteMany({
      where: { userId: id },
    });
  
    // Then delete the user
    return this.prisma.user.delete({ where: { userId: id } });
  }
  

  async login(mobileNo: string, password: string) {
    // Find the user by mobile number
    const user = await this.prisma.user.findUnique({ where: { mobileNo } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    // Generate a JWT token
    const payload = { userId: user.userId, mobileNo: user.mobileNo,userProfile:user.userProfile ,email:user.email};
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }

  // async  filterUsers({
  //   gender,
  //   communityId,
  //   casteId,
  //   subCasteId,
  //   kulamId,
  //   kothiramId,
  //   lagnam,
  //   dosham,
  //   natchathiram,
  //   rasi,
  //   page = 1,
  //   pageSize = 10,
  // }: {
  //   gender?: Gender;
  //   communityId?: string;
  //   casteId?: string;
  //   rasi?: string;
  //   subCasteId?: string;
  //   kulamId?: string;
  //   kothiramId?: string;
  //   lagnam?: string;
  //   dosham?: string;

  //   natchathiram?: string;
  //   page?: number;
  //   pageSize?: number;
  // }) {
  //   const skip = (page - 1) * pageSize;
  
  //   const users = await this.prisma.user.findMany({
  //     where: {
  //       AND: [
  //         gender ? { gender } : {},
  //         communityId ? { communityId } : {},
  //         casteId ? { casteId } : {},
  //         subCasteId ? { subCasteId } : {},
  //         kulamId ? { kulamId } : {},
  //         kothiramId ? { kothiramId } : {},
  //         (lagnam || dosham || natchathiram||rasi)
  //           ? {
  //               jathagam: {
  //                 some: {
  //                   lagnam: lagnam ? { equals: lagnam } : undefined,
  //                   dosham: dosham ? { equals: dosham } : undefined,
  //                   natchathiram: natchathiram ? { equals: natchathiram } : undefined,
  //                   rasi: rasi ? { equals: rasi } : undefined, // Filter by rasi if provided
  //                 },
  //               },
  //             }
  //           : {},
  //       ],
  //     },
  //     skip,
  //     take: pageSize, // Ensure this is an integer
  //     include: {
  //       community: true,
  //       caste: true,
  //       Sub_caste: true,
  //       kulam_: true,
  //       kothiram_: true,
  //       jathagam: true, // Include Jathagam data
  //     },
  //   });
  
  //   const totalCount = await this.prisma.user.count({
  //     where: {
  //       AND: [
  //         gender ? { gender } : {},
  //         communityId ? { communityId } : {},
  //         casteId ? { casteId } : {},
  //         subCasteId ? { subCasteId } : {},
  //         kulamId ? { kulamId } : {},
  //         kothiramId ? { kothiramId } : {},
  //         (lagnam || dosham || natchathiram||rasi)
  //           ? {
  //               jathagam: {
  //                 some: {
  //                   lagnam: lagnam ? { equals: lagnam } : undefined,
  //                   dosham: dosham ? { equals: dosham } : undefined,
  //                   natchathiram: natchathiram ? { equals: natchathiram } : undefined,
  //                   rasi: rasi ? { equals: rasi } : undefined,
  //                 },
  //               },
  //             }
  //           : {},
  //       ],
  //     },
  //   });
  
  //   return {
  //     users,
  //     totalCount,
  //     currentPage: page,
  //     totalPages: Math.ceil(totalCount / pageSize),
  //   };
  // }
  
  
  
  async filterUsers({
    gender,
    communityId,
    casteId,
    subCasteId,
    kulamId,
    kothiramId,
    lagnam,
    dosham,
    natchathiram,
    rasi,
    page = 1,
    pageSize = 10,
  }: {
    gender?: Gender;
    communityId?: string;
    casteId?: string;
    rasi?: string;
    subCasteId?: string;
    kulamId?: string;
    kothiramId?: string;
    lagnam?: string;
    dosham?: string[]; // Array for multiple dosham
    natchathiram?: string[]; // Array for multiple natchathiram
    page?: number;
    pageSize?: number;
  }) {
    const skip = (page - 1) * pageSize;
  
    const users = await this.prisma.user.findMany({
      where: {
        AND: [
          gender ? { gender } : {},
          communityId ? { communityId } : {},
          casteId ? { casteId } : {},
          subCasteId ? { subCasteId } : {},
          kulamId ? { kulamId } : {},
          kothiramId ? { kothiramId } : {},
          (lagnam || dosham?.length || natchathiram?.length || rasi)
            ? {
                jathagam: {
                  some: {
                    lagnam: lagnam ? { equals: lagnam } : undefined,
                    dosham: dosham?.length ? { in: dosham } : undefined, // Handle multiple dosham
                    natchathiram: natchathiram?.length ? { in: natchathiram } : undefined, // Handle multiple natchathiram
                    rasi: rasi ? { equals: rasi } : undefined,
                  },
                },
              }
            : {},
        ],
      },
      skip,
      take: pageSize,
      include: {
        community: true,
        caste: true,
        Sub_caste: true,
        kulam_: true,
        kothiram_: true,
        jathagam: true,
      },
    });
  
    const totalCount = await this.prisma.user.count({
      where: {
        AND: [
          gender ? { gender } : {},
          communityId ? { communityId } : {},
          casteId ? { casteId } : {},
          subCasteId ? { subCasteId } : {},
          kulamId ? { kulamId } : {},
          kothiramId ? { kothiramId } : {},
          (lagnam || dosham?.length || natchathiram?.length || rasi)
            ? {
                jathagam: {
                  some: {
                    lagnam: lagnam ? { equals: lagnam } : undefined,
                    dosham: dosham?.length ? { in: dosham } : undefined,
                    natchathiram: natchathiram?.length ? { in: natchathiram } : undefined,
                    rasi: rasi ? { equals: rasi } : undefined,
                  },
                },
              }
            : {},
        ],
      },
    });
  
    return {
      users,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }
  
  
  
  
  




}