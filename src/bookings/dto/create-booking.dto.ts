import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookingDto {
    @IsNotEmpty()
    @IsNumber()
    serviceId: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}
