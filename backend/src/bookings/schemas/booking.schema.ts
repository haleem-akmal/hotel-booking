// src/bookings/schemas/booking.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose'; // 1. Import MongooseSchema for defining relationships
import { User } from 'src/users/schemas/user.schema'; // 2. Import the User schema for referencing users
import { Hotel } from 'src/hotels/schemas/hotel.schema'; // 3. Import the Hotel schema for referencing hotels

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  // 4. Relationship with the User model
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User; // Reference to the user who made the booking

  // 5. Relationship with the Hotel model
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Hotel', required: true })
  hotel: Hotel; // Reference to the booked hotel

  @Prop({ required: true })
  checkInDate: Date; // 6. Check-in date

  @Prop({ required: true })
  checkOutDate: Date; // 7. Check-out date

  @Prop({ required: true })
  totalPrice: number; // Total cost of the booking
}

export const BookingSchema = SchemaFactory.createForClass(Booking);