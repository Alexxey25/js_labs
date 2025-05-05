import { PartialType } from '@nestjs/mapped-types';
import {CreateVehicleDto } from './create-vehicle.dto';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
//все поля необязательные, удобно при обновлении карточки
