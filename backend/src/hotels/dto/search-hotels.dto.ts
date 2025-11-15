// src/hotels/dto/search-hotels.dto.ts

import { IsDateString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchHotelsDto {
  // 1. @IsDateString() validation
  @IsDateString()
  @IsNotEmpty()
  checkIn: string;

  @IsDateString()
  @IsNotEmpty()
  checkOut: string;

  // 2. Query parameters URL-ல் string ஆக வரும்.
  // NestJS ValidationPipe-ஐ transform: true உடன் பயன்படுத்தும்போது, 
  // அவை தானாகவே Date-ஆக மாற முயற்சிக்கும்.
  // @Type(() => Date) சில சமயங்களில் தேவைப்படலாம், 
  // ஆனால் @IsDateString() string format-ஐயே சரிபார்க்கும்.
  // இப்போதைக்கு இது போதுமானது.
}