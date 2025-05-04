import { Injectable } from '@nestjs/common';
import {CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import {vhclService} from '../appVehicles.service';
import {Vehicle} from './entities/vehicle.entity'
@Injectable()
export class VehiclesService {
  constructor(private VService: vhclService<Vehicle[]>) {}

  create(createVehiclesDto: CreateVehicleDto) {
    const vehicles = this.VService.read();

    // для простоты новый id = текущее количество карточек + 1
    const vehicle = { ...createVehiclesDto, id: vehicles.length + 1 };

    this.VService.add(vehicle); // добавление новой акции
  }

  findAll(title?: string): Vehicle[] { //если title не передам возвращает все карточки
    const vehicles = this.VService.read();

    return title
      ? vehicles.filter((vehicle) =>
          vehicle.title.toLowerCase().includes(title.toLowerCase()),
        )
      : vehicles;
  }

  findOne(id: number): Vehicle | null { //ищет карточку по id, если нет null
    const vehicles = this.VService.read();

    return vehicles.find((vehicle) => vehicle.id === id) ?? null;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto): void {
    const vehicles = this.VService.read();

    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.id === id ? { ...vehicle, ...updateVehicleDto } : vehicle,
    //обновляет только карточки с указанным id
    );

    this.VService.write(updatedVehicles);
  }

  remove(id: number): void {
    const filteredVehicles = this.VService
      .read()
      .filter((vehicle) => vehicle.id !== id);
    //удаляет по id
    this.VService.write(filteredVehicles);
  }
}