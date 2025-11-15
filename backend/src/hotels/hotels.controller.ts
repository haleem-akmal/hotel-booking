import { Controller, Post, Body, UseGuards, Get, Param, Patch, Delete,  UseInterceptors, UploadedFiles,Query } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto'; // 2. Import the DTO for hotel creation
import { AuthGuard } from '@nestjs/passport'; // 3. Import the authentication guard
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { FilesInterceptor } from '@nestjs/platform-express'; // 3. Import FilesInterceptor for handling multiple uploads
import { SearchHotelsDto } from './dto/search-hotels.dto';

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
   * (findAll method is here...)
   */
  @Get()
  findAll() {
    // 3. இது '/hotels' route-ஐ மட்டும் கையாளும்
    return this.hotelsService.findAll();
  }

  /**
   * GET /hotels/search?checkIn=...&checkOut=... (Public)
   * கிடைக்கும் (Available) hotels-களைத் தேடுகிறது
   */
  // 4. 'search' endpoint-ஐச் சேர்க்கவும்
  @Get('search')
  searchAvailableHotels(@Query() searchDto: SearchHotelsDto) {
    // 5. ValidationPipe (main.ts) தானாகவே DTO-வை validate செய்யும்
    return this.hotelsService.searchAvailableHotels(searchDto);
  }

/**
   * GET /hotels/:id (Public)
   * (findOne method is here...)
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
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
