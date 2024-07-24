import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking, Transaction, User } from '@prisma/client';

@Injectable()
export class BookingsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createBookingDto: CreateBookingDto): Promise<Booking> {
        const { serviceId, userId, amount } = createBookingDto;

        // Fetch the user and service
        const user: User = await this.prisma.user.findUnique({ where: { id: userId } });
        const service = await this.prisma.service.findUnique({ where: { id: serviceId } });

        if (!user) throw new NotFoundException('User not found');
        if (!service) throw new NotFoundException('Service not found');

        // Check if user has enough balance
        if (user.balance < amount) throw new BadRequestException('Insufficient balance');

        return this.prisma.$transaction(async (prisma) => {
            // Create the transaction
            const transaction: Transaction = await prisma.transaction.create({
                data: {
                    userId: user.id,
                    amount,
                },
            });

            // Create the booking
            const booking: Booking = await prisma.booking.create({
                data: {
                    serviceId,
                    userId,
                    transactionId: transaction.id,
                },
            });

            // Update the balance of user and service provider
            await prisma.user.update({
                where: { id: user.id },
                data: { balance: { decrement: amount } },
            });

            await prisma.user.update({
                where: { id: service.userId },
                data: { balance: { increment: amount } },
            });

            return booking;
        });
    }

    async findAll(): Promise<Booking[]> {
        return this.prisma.booking.findMany();
    }
}
