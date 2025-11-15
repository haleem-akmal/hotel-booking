// backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // 1. ConfigService-ஐ Import செய்யவும்

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. app-லிருந்து ConfigService-ஐப் பெறவும்
  const configService = app.get(ConfigService); 

  // ValidationPipe (இது ஏற்கெனவே இருக்கும்)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 3. .env-லிருந்து URL-ஐப் பயன்படுத்தவும்
  app.enableCors({
    origin: configService.getOrThrow<string>('FRONTEND_URL'), // 4. Hardcode-ஐ மாற்றவும்
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();