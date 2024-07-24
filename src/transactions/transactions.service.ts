import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Transaction } from '@prisma/client';

@Injectable()
export class TransactionsService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(): Promise<Transaction[]> {
        return this.prisma.transaction.findMany();
    }
}
