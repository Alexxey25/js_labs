import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { FileService } from '../file.service';
import { Vehicle } from './entities/vehicle.entity';
export declare class VehiclesService {
    private fileService;
    constructor(fileService: FileService<Vehicle[]>);
    create(createVehiclesDto: CreateVehicleDto): void;
    findAll(title?: string): Vehicle[];
    findOne(id: number): Vehicle | null;
    update(id: number, updateVehicleDto: UpdateVehicleDto): void;
    remove(id: number): void;
}
