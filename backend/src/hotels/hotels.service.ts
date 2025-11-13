import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; // 1. Import the decorator used for injecting the model
import { Model } from 'mongoose'; // 2. Import the Mongoose Model type
import { Hotel, HotelDocument } from './schemas/hotel.schema'; // 3. Import the Hotel schema and document type
import { CreateHotelDto } from './dto/create-hotel.dto'; // 1. Import the DTO for creating a hotel
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ConfigService } from '@nestjs/config'; // 1. Import ConfigService for accessing environment variables

@Injectable()
export class HotelsService {

  // 4. Constructor-based dependency injection
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
    private configService: ConfigService, // 2. Inject ConfigService into the service
  ) {}

   /**
   * Creates a new hotel record (including image URLs) in the database
   * @param createHotelDto The hotel’s textual data
   * @param files The array of uploaded images
   * @returns The created hotel document
   */
  async create(
    createHotelDto: CreateHotelDto,
    files: Array<Express.Multer.File>, // 1. Receive the uploaded files array
  ): Promise<HotelDocument> {
    
    // 2. Transform the uploaded files into an array of image URLs
    const imageUrls = files.map((file) => {
      const serverUrl = this.configService.getOrThrow<string>('FRONTEND_URL'); // e.g., http://localhost:3000
      
      // 3. Use 'filename' instead of 'path'
      // When using Multer with 'dest', only 'filename' is available, not the full path
      const imagePath = `/uploads/${file.filename}`;
      return `${serverUrl}${imagePath}`;
    });

    // 4. Merge DTO data with the generated image URLs before saving
    const hotelData = {
      ...createHotelDto, // includes name, pricePerNight, etc.
      imageUrls: imageUrls, // array of uploaded image URLs
    };

    // 5. Save the complete hotel data to the database
    const createdHotel = new this.hotelModel(hotelData);
    return createdHotel.save();
  }

  /**
   * Retrieves all hotels from the database
   * @returns An array of hotel documents
   */
  async findAll(): Promise<HotelDocument[]> {
    // 1. Use Mongoose’s find() method to fetch all hotel records
    return this.hotelModel.find().exec();
  }

  /**
 * Finds a hotel in the database by its ID
 * @param id The ID of the hotel to find
 * @returns The hotel document (if found)
 */
async findOne(id: string): Promise<HotelDocument> {
  // 2. Use Mongoose’s findById() method to fetch the hotel
  const hotel = await this.hotelModel.findById(id).exec();

  // 3. Throw an error if the hotel does not exist
  if (!hotel) {
    throw new NotFoundException(`Hotel with ID "${id}" not found`);
  }

  // 4. Return the found hotel
  return hotel;
}

/**
 * Finds a hotel by its ID and updates its details
 * @param id The ID of the hotel to update
 * @param updateHotelDto The data used for updating the hotel
 * @returns The updated hotel document
 */
async update(
  id: string,
  updateHotelDto: UpdateHotelDto,
): Promise<HotelDocument> {
  // 2. Use Mongoose’s findByIdAndUpdate() method to modify the hotel
  const updatedHotel = await this.hotelModel
    .findByIdAndUpdate(id, updateHotelDto, { new: true }) // 3. Return the updated document by setting { new: true }
    .exec();

  // 4. Throw an error if the hotel with the given ID is not found
  if (!updatedHotel) {
    throw new NotFoundException(`Hotel with ID "${id}" not found`);
  }

  // 5. Return the updated hotel document
  return updatedHotel;
}

/**
 * Finds a hotel by its ID and deletes it from the database
 * @param id The ID of the hotel to delete
 * @returns The deleted hotel document
 */
async delete(id: string): Promise<HotelDocument> {
  // 1. Use Mongoose’s findByIdAndDelete() method to remove the hotel
  const deletedHotel = await this.hotelModel.findByIdAndDelete(id).exec();

  // 2. Throw an error if no hotel is found with the given ID
  if (!deletedHotel) {
    throw new NotFoundException(`Hotel with ID "${id}" not found`);
  }

  // 3. Return the deleted hotel document
  return deletedHotel;
}

}