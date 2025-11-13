// src/bookings/bookings.controller.ts

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get, // 1. Import 'Request' to access the current user's request object
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto'; // 2. Import the DTO for booking creation
import { AuthGuard } from '@nestjs/passport'; // 3. Import AuthGuard for route protection

@Controller('bookings') // 4. Base route for all '/bookings' endpoints
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {} // 5. Inject the BookingsService

  /**
   * POST /bookings
   * (Protected route)
   */
  @Post() // 6. Handles POST requests to /bookings
  @UseGuards(AuthGuard('jwt')) // 7. Accessible only to authenticated users
  create(
    @Body() createBookingDto: CreateBookingDto, // 8. Retrieve the booking data from the request body
    @Request() req, // 9. Access the full request object (to get the authenticated user)
  ) {
    // 10. ValidationPipe automatically validates the incoming request data
    // 11. Pass both the DTO and the logged-in user to the service
    return this.bookingsService.create(createBookingDto, req.user);
  }

  /**
 * GET /bookings (Protected)
 * Retrieves bookings belonging only to the logged‑in user
 */
// 2. Add the 'findByUser' endpoint
@Get()
@UseGuards(AuthGuard('jwt')) // 3. Accessible only to authenticated users
findByUser(@Request() req) {
  // 4. Extract the logged‑in user's ID from the request object
  const userId = req.user._id;
  // 5. Pass the user ID to the service to fetch bookings
  return this.bookingsService.findByUser(userId);
}
}