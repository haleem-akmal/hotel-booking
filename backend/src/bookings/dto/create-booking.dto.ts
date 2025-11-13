// src/bookings/dto/create-booking.dto.ts

import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsMongoId() // 1. Ensures that this is a valid MongoDB ObjectId
  @IsNotEmpty()
  hotelId: string;

  @IsDateString() // 2. Validates that the value is a valid ISO date string (e.g., "2025-12-31T00:00:00.000Z")
  @IsNotEmpty()
  checkInDate: string; // Frontend sends date values as strings in JSON, which is easier to handle

  @IsDateString()
  @IsNotEmpty()
  checkOutDate: string;

  // We do not include totalPrice in the DTO.
  // Why? Because we should never trust pricing data sent from the frontend.
  // Instead, the backend will calculate totalPrice using the hotel's pricePerNight
  // and the difference between the check-in and check-out dates.
}