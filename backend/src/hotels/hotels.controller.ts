import { Controller, Post, Body, UseGuards, Get, Param, Patch, Delete,  UseInterceptors, UploadedFiles, } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto'; // 2. Import the DTO for hotel creation
import { AuthGuard } from '@nestjs/passport'; // 3. Import the authentication guard
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { FilesInterceptor } from '@nestjs/platform-express'; // 3. Import FilesInterceptor for handling multiple uploads


@Controller('hotels')
export class HotelsController {

    constructor(private readonly hotelsService: HotelsService) {} // 5. Inject the HotelsService

  /**
   * POST /hotels (Protected)
   * Handles multipart/form-data for hotel creation
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('imageFiles', 6)) // Enables Multer for handling uploads (max 6 files)
  create(
    @Body() createHotelDto: CreateHotelDto, // Receives textual form data
    @UploadedFiles() files: Array<Express.Multer.File>, // Receives uploaded file data
  ) {
    // 1. Removed console.log; directly call the service method
    // 2. Pass both DTO and uploaded files to the service
    return this.hotelsService.create(createHotelDto, files);
  }


  /**
 * GET /hotels (Public)
 * Retrieves a list of all hotels
 */
// 2. Add the 'findAll' endpoint
@Get()
findAll() {
  // 3. No authentication guard applied (public route)
  return this.hotelsService.findAll();
}

/**
 * GET /hotels/:id (Public)
 * Retrieves a specific hotel by its ID
 */
// 2. Add the 'findOne' endpoint
@Get(':id') // 3. Define the ':id' route parameter
findOne(@Param('id') id: string) {
  // 4. Pass the ID to the service for lookup
  return this.hotelsService.findOne(id);
}

/**
 * PATCH /hotels/:id (Protected)
 * Updates a specific hotel by its ID
 */
// 3. Add the 'update' endpoint
@Patch(':id') // 4. Define the ':id' route parameter
@UseGuards(AuthGuard('jwt')) // 5. Accessible only to authenticated users
update(
  @Param('id') id: string, // 6. Extract the hotel ID from the URL
  @Body() updateHotelDto: UpdateHotelDto, // 7. Extract update data from the request body
) {
  // 8. The ValidationPipe automatically validates the incoming data
  return this.hotelsService.update(id, updateHotelDto);
}

/**
 * DELETE /hotels/:id (Protected)
 * Deletes a specific hotel by its ID
 */
// 2. Add the 'delete' endpoint
@Delete(':id') // 3. Define the ':id' route parameter
@UseGuards(AuthGuard('jwt')) // 4. Accessible only to authenticated users
delete(@Param('id') id: string) {
  // 5. Extract the hotel ID from the URL and pass it to the service
  return this.hotelsService.delete(id);
}

}
