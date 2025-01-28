import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUser(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user || null;
  }
}
