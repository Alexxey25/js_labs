import { Module } from '@nestjs/common';
import { VehiclesService as VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controllers';
import {vhclService} from '../appVehicles.service';
import {vehiclesAccessor} from '../appVehicles.service';
import {Vehicle} from './entities/vehicle.entity'
@Module({
  controllers: [VehiclesController],
  providers: [
    VehiclesService,
    {
      provide: vhclService,
      useFactory: (vehicles: VehiclesModule) =>
        new vhclService<Vehicle[]>(vehicles.filePath),
      inject: [VehiclesModule],
    },
  ],
})
export class VehiclesModule implements vehiclesAccessor {
  public readonly filePath = 'assets/vehicles.json';
}