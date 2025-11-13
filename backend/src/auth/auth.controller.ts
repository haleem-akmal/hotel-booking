// src/auth/auth.controller.ts

import { Controller, Post, Body, UseGuards, Get, Request, Query } from '@nestjs/common'; // 1. Post மற்றும் Body-ஐ Import செய்யவும்
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto'; // 2. DTO-வை Import செய்யவும்
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth') // 3. Base route '/auth'
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 4. POST /auth/register endpoint
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    // 5. ValidationPipe இங்கே தானாகவே இயங்கும்
    return this.authService.register(createUserDto);
  }

  /**
   * POST /auth/login
   */
  // 2. Login endpoint-ஐச் சேர்க்கவும்
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    // 3. ValidationPipe இங்கே LoginDto-வை validate செய்யும்
    return this.authService.login(loginDto);
  }

  /**
   * GET /auth/profile
   * இது ஒரு பாதுகாக்கப்பட்ட route.
   */
  // 3. UseGuards Decorator-ஐப் பயன்படுத்தவும்
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    // 4. req.user-ஐ அணுகவும்
    return req.user;
  }

  /**
   * GET /auth/verify-email
   * Email-ல் உள்ள link-ஐக் கையாளும் endpoint
   */
  // 2. 'verify-email' route-ஐச் சேர்க்கவும்
  @Get('verify-email')
  verifyEmail(@Query('token') token: string) {
    // 3. Token-ஐ AuthService-க்கு அனுப்பவும்
    return this.authService.verifyEmail(token);
  }
}