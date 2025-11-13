// src/bookings/bookings.module.ts

import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose'; // 1. Import MongooseModule for database integration
import { Booking, BookingSchema } from './schemas/booking.schema'; // 2. Import the Booking schema
import { HotelsModule } from 'src/hotels/hotels.module';

@Module({
  // 3. Register the Booking schema within the MongooseModule imports array
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
    ]),
    HotelsModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}