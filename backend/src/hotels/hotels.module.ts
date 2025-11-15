import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { MongooseModule } from '@nestjs/mongoose'; // 1. Import MongooseModule for database interaction
import { Hotel, HotelSchema } from './schemas/hotel.schema'; // 2. Import the Hotel schema
import { Booking, BookingSchema } from 'src/bookings/schemas/booking.schema';
import { MulterModule } from '@nestjs/platform-express'; // 1. Import MulterModule for file uploads
import { join } from 'path'; // 2. Import 'path' utility for directory management

@Module({
  // 3. Register the Hotel schema within the MongooseModule imports array
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: Booking.name, schema: BookingSchema },
  ]),

    // 3. Configure MulterModule for handling file storage
    MulterModule.register({
      dest: join(__dirname, '..', '..', 'uploads'), // 4. Destination folder for uploaded files
    }),
  ],
  providers: [HotelsService],
  controllers: [HotelsController],
  exports: [HotelsService],
})
export class HotelsModule {}