import { Injectable } from '@nestjs/common';
import {CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import {FileService} from '../file.service';
import {Vehicle} from './entities/vehicle.entity'
@Injectable()
export class VehiclesService {
  constructor(private fileService: FileService<Vehicle[]>) {}

  create(createVehiclesDto: CreateVehicleDto) {
    const vehicles = this.fileService.read();

    // для простоты новый id = текущее количество карточек + 1
    const vehicle = { ...createVehiclesDto, id: vehicles.length + 1 };

    this.fileService.add(vehicle); // добавление новой акции
  }

  findAll(title?: string): Vehicle[] { //если title не передам возвращает все карточки
    const vehicles = this.fileService.read();

    return title
      ? vehicles.filter((vehicle) =>
          vehicle.title.toLowerCase().includes(title.toLowerCase()),
        )
      : vehicles;
  }

  findOne(id: number): Vehicle | null { //ищет карточку по id, если нет null
    const vehicles = this.fileService.read();

    return vehicles.find((vehicle) => vehicle.id === id) ?? null;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto): void {
    const vehicles = this.fileService.read();

    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.id === id ? { ...vehicle, ...updateVehicleDto } : vehicle,
    //обновляет только карточки с указанным id
    );

    this.fileService.write(updatedVehicles);
  }

  remove(id: number): void {
    const filteredVehicles = this.fileService
      .read()
      .filter((vehicle) => vehicle.id !== id);
    //удаляет по id
    this.fileService.write(filteredVehicles);
  }
}