// src/bookings/bookings.service.ts

import { Injectable, BadRequestException, InternalServerErrorException, } from '@nestjs/common'; // 1. Import BadRequestException for validation errors
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { HotelsService } from 'src/hotels/hotels.service';
import { CreateBookingDto } from './dto/create-booking.dto'; // 2. Import the DTO for booking creation
import { UserDocument } from 'src/users/schemas/user.schema'; // 3. Import UserDocument for user reference
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private hotelsService: HotelsService,
    private mailerService: MailerService,
  ) {}

  /**
   * Creates a new booking in the database
   * @param createBookingDto Booking data including hotelId and dates
   * @param user The logged-in user (injected through AuthGuard)
   * @returns The created booking document
   */
  async create(
    createBookingDto: CreateBookingDto,
    user: UserDocument,
  ): Promise<BookingDocument> {
    const { hotelId, checkInDate, checkOutDate } = createBookingDto;

    // Step 1: Retrieve the hotel and its price per night
    const hotel = await this.hotelsService.findOne(hotelId);
    const pricePerNight = hotel.pricePerNight;

    // Step 2: Convert date strings into Date objects
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Step 3: Validate that check-out is after check-in
    if (checkOut <= checkIn) {
      throw new BadRequestException('Check-out date must be after check-in date');
    }

    // Step 4: Calculate number of nights
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    const numberOfNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    // Step 5: Calculate total price
    const totalPrice = pricePerNight * numberOfNights;

    // Step 6: Create a new booking instance (in memory)
    const newBooking = new this.bookingModel({
      user: user._id,
      hotel: hotelId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice: totalPrice,
    });

    // Step 7: Save the booking to the database
    const createdBooking = await newBooking.save();

    // Step 8: Send booking confirmation email (new feature)
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: `Your Booking Confirmation for ${hotel.name}`,
        template: './booking-receipt', // templates/booking-receipt.hbs
        context: {
          userName: user.firstName, // {{userName}}
          hotelName: hotel.name, // {{hotelName}}
          // Send formatted dates for easier readability
          checkInDate: checkIn.toLocaleDateString(), // {{checkInDate}}
          checkOutDate: checkOut.toLocaleDateString(), // {{checkOutDate}}
          totalPrice: createdBooking.totalPrice, // {{totalPrice}}
        },
      });
    } catch (error) {
      console.error('Error sending booking receipt email:', error);
      // Even if the email fails, the booking has already been created.
      // We log the error instead of throwing an exception.
      // In a large-scale system, this would typically be queued for retry.
    }

    // Step 9: Return the created booking
    return createdBooking;
  }

  /**
 * Retrieves all bookings for a specific user
 * @param userId The ID of the logged-in user
 * @returns An array of bookings (with populated hotel details)
 */
async findByUser(userId: string): Promise<BookingDocument[]> {
  // 1. Use Mongoose’s find() method to query the database
  return this.bookingModel
    .find({ user: userId }) // 2. Search for bookings matching the given user ID
    .populate('hotel') // 3. Populate the 'hotel' field with its full document
    .exec();
}
}