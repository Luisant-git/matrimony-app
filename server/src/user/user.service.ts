import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Gender } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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
    return this.prisma.user.findMany({
      include: {
        siblings: true,
        jathagam: true,
        wishlists: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { userId: id },
      include: {
        siblings: true,
        jathagam: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: any) {
    const user = await this.findOne(id);

    // Extract jathagam array (if provided) and userProfile; we'll handle jathagam separately
    const { jathagam, siblings, ...userPayload } = updateUserDto || {};

    // Update user fields (excluding jathagam relationship)
    const updatedUser = await this.prisma.user.update({
      where: { userId: id },
      data: {
        regNo: userPayload?.regNo,
        fullName: userPayload?.fullName,
        mobileNo: userPayload?.mobileNo,
        email: userPayload?.email,
        password: userPayload?.password,
        gender: userPayload?.gender,
        dateOfBirth: userPayload?.dateOfBirth,
        state: userPayload.state,
        district: userPayload?.district,
        address: userPayload?.address,
        profile: userPayload?.profile,
        birthTime: userPayload?.birthTime,
        userProfile: userPayload?.userProfile, // set the array of profile image URLs
        birthPlace: userPayload?.birthPlace,
        education: userPayload?.education,
        job: userPayload?.job,
        job_type: userPayload?.job_type,
        organization: userPayload?.organization,
        height: userPayload?.height,
        weight: userPayload?.weight,
        color: userPayload?.color,
        income: userPayload?.income,
        kulam: userPayload?.kulam,
        kothiram: userPayload?.kothiram,
        poorvigam: userPayload?.poorvigam,
        maritalStatus: userPayload?.maritalStatus,
        ownHouse: userPayload?.ownHouse,
        casteId: userPayload?.casteId,
        subCasteId: userPayload?.subCasteId,
        communityId: userPayload?.communityId,
        kulamId: userPayload?.kulamId,
        kothiramId: userPayload?.kothiramId,
        isActive: userPayload?.isActive,
        updatedAt: new Date(),
        siblings: {
          update: siblings?.update || [],
          create: siblings?.create || [],
        },
      },
    });

    // If jathagam array is provided, replace existing jathagam records for this user
    if (Array.isArray(jathagam)) {
      // Remove existing jathagam entries for the user
      await this.prisma.jathagam.deleteMany({ where: { userId: id } });

      // Prepare new records (ensure userId is set)
      const createData = jathagam.map((g) => ({
        rasi: g.rasi,
        uploadJathakam: g.uploadJathakam,
        natchathiram: g.natchathiram,
        lagnam: g.lagnam,
        dosham: g.dosham,
        userId: id,
      }));

      if (createData.length > 0) {
        // createMany is faster for multiple inserts
        await this.prisma.jathagam.createMany({ data: createData });
      }
    }

    // Return the updated user with relations
    return this.prisma.user.findUnique({
      where: { userId: id },
      include: { siblings: true, jathagam: true },
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

    // Compare the provided password with the stored password (plain text)
    if (password !== user.password)
      throw new UnauthorizedException('Invalid credentials');

    // Generate a JWT token
    const payload = {
      userId: user.userId,
      mobileNo: user.mobileNo,
      userProfile: user.userProfile,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user: {
        userId: user.userId,
        mobileNo: user.mobileNo,
        email: user.email,
        fullName: user.fullName,
      },
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
          lagnam || dosham?.length || natchathiram?.length || rasi
            ? {
                jathagam: {
                  some: {
                    lagnam: lagnam ? { equals: lagnam } : undefined,
                    dosham: dosham?.length ? { in: dosham } : undefined, // Handle multiple dosham
                    natchathiram: natchathiram?.length
                      ? { in: natchathiram }
                      : undefined, // Handle multiple natchathiram
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
          lagnam || dosham?.length || natchathiram?.length || rasi
            ? {
                jathagam: {
                  some: {
                    lagnam: lagnam ? { equals: lagnam } : undefined,
                    dosham: dosham?.length ? { in: dosham } : undefined,
                    natchathiram: natchathiram?.length
                      ? { in: natchathiram }
                      : undefined,
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
