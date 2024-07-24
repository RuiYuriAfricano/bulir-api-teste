import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        if (data.password) {
            data.password = await bcrypt.hash(data.password.toString(), 10);
        }
        return this.prisma.user.update({
            where: { id: id },
            data,
        });
    }

    async remove(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: { id: id },
        });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
            },
        });
    }
}
