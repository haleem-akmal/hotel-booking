// src/hotels/dto/update-hotel.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelDto } from './create-hotel.dto';

// 1. CreateHotelDto-வை extend செய்கிறது
export class UpdateHotelDto extends PartialType(CreateHotelDto) {}