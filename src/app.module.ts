import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { BookingsModule } from './bookings/bookings.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [AuthModule, UsersModule, ServicesModule, BookingsModule, TransactionsModule],
  providers: [PrismaService],
})
export class AppModule { }
