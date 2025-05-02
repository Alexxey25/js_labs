import { VehiclesService as VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
    create(createVehicleDto: CreateVehicleDto): void;
    findAll(title?: string): Vehicle[];
    findOne(id: string): Vehicle | null;
    update(id: string, updateVehicleDto: UpdateVehicleDto): void;
    remove(id: string): void;
}
