import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary() {
    const total = await this.prisma.user.count();
    // Count users who are married either by explicit maritalStatus
    // or deactivated with reason 'got_married'
    const married = await this.prisma.user.count({
      where: {
        OR: [
          { maritalStatus: 'MARRIED' },
          { AND: [{ isActive: false }, { deactivationReason: 'got_married' }] },
        ],
      },
    });

    const unmarried = await this.prisma.user.count({
      where: {
        AND: [
          { isActive: true },
          {
            OR: [
              { deactivationReason: null }, // never deactivated for marriage
              { deactivationReason: { not: 'got_married' } }, // deactivated for some other reason
            ],
          },
        ],
      },
    });

    const active = await this.prisma.user.count({ where: { isActive: true } });

    return { total, married, unmarried, active };
  }

  // period: 'day' (last 30 days), 'month' (last 12 months), 'year' (last 5 years)
  async getNewUsers(period: string = 'month') {
    const now = new Date();
    if (period === 'day') {
      const days = 30;
      const labels: string[] = [];
      const counts: number[] = [];
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        const start = new Date(
          d.getFullYear(),
          d.getMonth(),
          d.getDate(),
          0,
          0,
          0,
        );
        const end = new Date(
          d.getFullYear(),
          d.getMonth(),
          d.getDate(),
          23,
          59,
          59,
        );
        const cnt = await this.prisma.user.count({
          where: { createdAt: { gte: start, lte: end } },
        });
        labels.push(`${d.getMonth() + 1}/${d.getDate()}`);
        counts.push(cnt);
      }
      return { labels, counts };
    }

    if (period === 'year') {
      const years = 5;
      const labels: string[] = [];
      const counts: number[] = [];
      for (let i = years - 1; i >= 0; i--) {
        const y = now.getFullYear() - i;
        const start = new Date(y, 0, 1, 0, 0, 0);
        const end = new Date(y, 11, 31, 23, 59, 59);
        const cnt = await this.prisma.user.count({
          where: { createdAt: { gte: start, lte: end } },
        });
        labels.push(String(y));
        counts.push(cnt);
      }
      return { labels, counts };
    }

    // default: month (last 12 months)
    const months = 12;
    const labels: string[] = [];
    const counts: number[] = [];
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const start = new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
      const cnt = await this.prisma.user.count({
        where: { createdAt: { gte: start, lte: end } },
      });
      const monthName = start.toLocaleString('default', { month: 'short' });
      labels.push(`${monthName} ${start.getFullYear()}`);
      counts.push(cnt);
    }
    return { labels, counts };
  }
}
