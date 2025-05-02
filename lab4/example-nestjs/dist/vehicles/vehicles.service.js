"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("../file.service");
let VehiclesService = class VehiclesService {
    fileService;
    constructor(fileService) {
        this.fileService = fileService;
    }
    create(createVehiclesDto) {
        const vehicles = this.fileService.read();
        const vehicle = { ...createVehiclesDto, id: vehicles.length + 1 };
        this.fileService.add(vehicle);
    }
    findAll(title) {
        const vehicles = this.fileService.read();
        return title
            ? vehicles.filter((vehicle) => vehicle.title.toLowerCase().includes(title.toLowerCase()))
            : vehicles;
    }
    findOne(id) {
        const vehicles = this.fileService.read();
        return vehicles.find((vehicle) => vehicle.id === id) ?? null;
    }
    update(id, updateVehicleDto) {
        const vehicles = this.fileService.read();
        const updatedVehicles = vehicles.map((vehicle) => vehicle.id === id ? { ...vehicle, ...updateVehicleDto } : vehicle);
        this.fileService.write(updatedVehicles);
    }
    remove(id) {
        const filteredVehicles = this.fileService
            .read()
            .filter((vehicle) => vehicle.id !== id);
        this.fileService.write(filteredVehicles);
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_service_1.FileService])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map