import { Body, Controller, Post, Patch, Param, Delete, Get, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Guard de JWT
import { RolesGuard } from '../auth/roles.guard'; // Guard de Roles
import { Roles } from '../auth/roles.decorator'; // Decorador de Roles

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Prestador') // Apenas usuários com o papel 'Prestador' podem criar serviços
    async create(@Body() createServiceDto: CreateServiceDto) {
        return this.servicesService.create(createServiceDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard) // Apenas usuários autenticados podem acessar
    async findAll() {
        return this.servicesService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard) // Apenas usuários autenticados podem acessar
    async findOne(@Param('id') id: string) {
        return this.servicesService.findById(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Prestador') // Apenas usuários com o papel 'Prestador' podem atualizar serviços
    async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
        return this.servicesService.update(+id, updateServiceDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Prestador') // Apenas usuários com o papel 'Prestador' podem excluir serviços
    async remove(@Param('id') id: string) {
        return this.servicesService.remove(+id);
    }
}
