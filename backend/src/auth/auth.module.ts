// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt'; // 1. JwtModule-ஐ Import செய்யவும்
import { ConfigModule, ConfigService } from '@nestjs/config'; // 2. Config-ஐ Import செய்யவும்
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule, // UsersService-க்காக
    ConfigModule, // 3. ConfigModule-ஐ இங்கே import செய்யவும் (JwtModule-க்காக)
    PassportModule,
    
    // 4. JwtModule-ஐ registerAsync மூலம் Configure செய்யவும்
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // இது சரியாக உள்ளது, மாற்ற வேண்டாம்
        signOptions: {
          // FIX: இங்கே இருந்த <string> generic-ஐ நீக்கவும்
          expiresIn: configService.get('JWT_EXPIRES_IN'), 
        },
      }),
      inject: [ConfigService], // 8. ConfigService-ஐ inject செய்யவும்
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,],
})
export class AuthModule {}