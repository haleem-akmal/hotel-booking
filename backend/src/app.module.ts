import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer'; // 1. MailerModule-ஐ Import செய்யவும்
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'; // 2. HandlebarsAdapter-ஐ Import செய்யவும்
import { join } from 'path'; // 3. 'path'-ஐ Import செய்யவும் (Node.js built-in)
import { HotelsModule } from './hotels/hotels.module';
import { ServeStaticModule } from '@nestjs/serve-static'; // 1. Import ServeStaticModule for serving static files
import { BookingsModule } from './bookings/bookings.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),

    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:async(configService:ConfigService)=>({
        uri:configService.get<string>('MONGO_URI'),
      }),
      inject:[ConfigService],
    }),

    // 4. MailerModule-ஐ இங்கே சேர்க்கவும்
    MailerModule.forRootAsync({
      imports: [ConfigModule], // .env-ஐப் படிக்க
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow<string>('MAIL_HOST'), // 5. Host-ஐப் பெறவும்
          secure: false, // Gmail-க்கு false (TLS-க்காக)
          auth: {
            user: configService.getOrThrow<string>('MAIL_USER'), // 6. User-ஐப் பெறவும்
            pass: configService.getOrThrow<string>('MAIL_PASS'), // 7. App Password-ஐப் பெறவும்
          },
        },
        defaults: {
          from: configService.getOrThrow<string>('MAIL_FROM'), // 8. Default 'from' முகவரி
        },
        template: {
          // 9. Template engine-ஐ Configure செய்யவும்
          dir: join(__dirname, '..', 'templates'), // 10. Template folder-இன் பாதை
          adapter: new HandlebarsAdapter(), // 11. Handlebars-ஐப் பயன்படுத்தவும்
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],

      
    }),

    // 2. Add ServeStaticModule to serve static assets such as uploaded files
    ServeStaticModule.forRoot({
      // 3. Path to the local file system directory being served
      rootPath: join(__dirname, '..', 'uploads'),

      // 4. Public URL path for accessing static files
      serveRoot: '/uploads',
      
    }),

    UsersModule,

    AuthModule,

    HotelsModule,

    BookingsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
