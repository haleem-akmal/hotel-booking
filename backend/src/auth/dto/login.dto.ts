// src/auth/dto/login.dto.ts

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  // 1. Email validation
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // 2. Password validation
  @IsString()
  @IsNotEmpty()
  password: string;
}