import { Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { VehiclesService as VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import {FileService} from '../file.service';
import {Vehicle} from './entities/vehicle.entity'

//контроллер связь между клиентом и сервисом
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll(@Query('title') title?: string): Vehicle[] {
    return this.vehiclesService.findAll(title);
  }
  //@Query('title') параметр для фильтрации по заголовку (/stocks?title=акция).

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }
  //@Param('id') извлекает id из URL (/stocks/1).
  //+id — преобразует строку в число

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}


//Клиент отправляет HTTP-запрос (например, GET /stocks).
//NestJS направляет его в соответствующий метод контроллера.
//Контроллер вызывает метод сервиса (stocksService).
//Сервис выполняет логику (работа с БД, файлами и т.д.).
//Результат возвращается клиенту