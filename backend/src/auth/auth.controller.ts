// src/auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common'; // 1. Post மற்றும் Body-ஐ Import செய்யவும்
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto'; // 2. DTO-வை Import செய்யவும்

@Controller('auth') // 3. Base route '/auth'
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 4. POST /auth/register endpoint
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    // 5. ValidationPipe இங்கே தானாகவே இயங்கும்
    return this.authService.register(createUserDto);
  }
}