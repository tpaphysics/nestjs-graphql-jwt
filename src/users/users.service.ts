import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateUserInput): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number): Promise<User> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
