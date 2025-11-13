// src/hotels/schemas/hotel.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema({ timestamps: true })
export class Hotel {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  pricePerNight: number;

  @Prop({ default: 0 })
  starRating: number;

  // This field will be expanded later when implementing image handling
  @Prop([String]) // Represents an array of image URLs
  imageUrls: string[];

  // TODO: Add relation to the owner or the user who created the hotel entry,
  // keeping it simple for now.
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);