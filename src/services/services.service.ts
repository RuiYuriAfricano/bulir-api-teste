import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Prisma, Service } from '@prisma/client';

@Injectable()
export class ServicesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createServiceDto: CreateServiceDto): Promise<Service> {
        return this.prisma.service.create({
            data: createServiceDto,
        });
    }

    async findAll(): Promise<Service[]> {
        return this.prisma.service.findMany();
    }

    async findById(id: number): Promise<Service> {
        const service = await this.prisma.service.findUnique({
            where: { id },
        });
        if (!service) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }
        return service;
    }

    async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
        const service = await this.prisma.service.update({
            where: { id },
            data: updateServiceDto,
        });
        if (!service) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }
        return service;
    }

    async remove(id: number): Promise<Service> {
        const service = await this.prisma.service.delete({
            where: { id },
        });
        if (!service) {
            throw new NotFoundException(`Service with ID ${id} not found`);
        }
        return service;
    }
}
