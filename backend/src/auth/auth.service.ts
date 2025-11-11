// src/auth/auth.service.ts

import {
  Injectable,
  ConflictException, // 1. பிழையைக் கையாள இதை Import செய்யவும்
  InternalServerErrorException, // 2. பொதுவான பிழையைக் கையாள
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto'; // 3. DTO-வை Import செய்யவும்
import * as bcrypt from 'bcrypt'; // 4. bcrypt-ஐ Import செய்யவும்

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * ஒரு புதிய user-ஐ register செய்கிறது
   * @param createUserDto User-இன் data (email, password, etc.)
   */
  async register(createUserDto: CreateUserDto) {
    const { email, password, firstName, lastName } = createUserDto;

    // 5. படி 1: Email ஏற்கனவே உள்ளதா எனச் சோதிக்கவும்
    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      // 6. Email இருந்தால், பிழையை அனுப்பவும்
      throw new ConflictException('Email already exists');
    }

    // 7. படி 2: Password-ஐ Hash செய்யவும்
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 8. படி 3: User-ஐ உருவாக்கவும்
   try {
      const user = await this.usersService.create({
        email,
        password: hashedPassword, // Hashed password-ஐ அனுப்பவும்
        firstName,
        lastName,
      });

      // 9. இதுதான் புதிய Fix:
      
      // Mongoose document-ஐ ஒரு plain JavaScript object-ஆக மாற்றவும்
      const { password, ...result } = user.toObject();
      
      // password-ஐத் தவிர ("...") மீதமுள்ள ("result") object-ஐ மட்டும் return செய்யவும்
      return result;

    } catch (error) {
      // 11. Database பிழை ஏற்பட்டால்
      throw new InternalServerErrorException('Error creating user');
    }
  }
}