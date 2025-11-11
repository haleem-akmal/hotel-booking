import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel:Model<UserDocument>,
    ){}

    /**
   * ஒரு புதிய user-ஐ database-ல் உருவாக்குகிறது
   * @param createUserDto User-இன் data (email, password, etc.)
   * @returns உருவாக்கப்பட்ட user object
   */
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // 2. DTO-வை userModel-க்குக் கொடுக்கவும்
    const createdUser = new this.userModel(createUserDto);
    
    // 3. Database-ல் சேமிக்கவும்
    return createdUser.save();
  }

  /**
   * ஒரு user-ஐ அவர்களின் email மூலம் database-ல் தேடுகிறது
   * @param email தேட வேண்டிய email
   * @returns User object (if found) or null (if not found)
   */
  async findOneByEmail(email: string): Promise<UserDocument | null> {
    // 1. Mongoose-இன் findOne method-ஐப் பயன்படுத்தவும்
    return this.userModel.findOne({ email: email }).exec();
  }
}
