import { Controller, Get, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Get()
    async findAll() {
        return this.transactionsService.findAll();
    }
}
