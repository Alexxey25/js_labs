import { Module } from '@nestjs/common';
import { VehiclesService as VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controllers';
import {FileService} from '../file.service';
import {FileAccessor} from '../file.service';
import {Vehicle} from './entities/vehicle.entity'
@Module({
  controllers: [VehiclesController],
  providers: [
    VehiclesService,
    {
      provide: FileService,
      useFactory: (vehicles: VehiclesModule) =>
        new FileService<Vehicle[]>(vehicles.filePath),
      inject: [VehiclesModule],
    },
  ],
})
export class VehiclesModule implements FileAccessor {
  public readonly filePath = 'assets/stocks.json';
}