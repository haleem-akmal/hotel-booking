// src/hotels/dto/create-hotel.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsArray,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';



export class CreateHotelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0) // Price per night must not be less than 0
  pricePerNight: number;

  @Type(() => Number)
  @IsOptional() // This field is optional
  @IsNumber()
  @Min(1)
  @Max(5) // Rating must be between 1 and 5
  starRating: number;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true }) // Each item in the array must be a valid URL
  imageUrls: string[];
}