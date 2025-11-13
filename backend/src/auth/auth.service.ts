// src/auth/auth.service.ts

import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  /**
   * Sari Seiyappatta (Fixed) Register Function
   */
  async register(createUserDto: CreateUserDto) {
    const { email, password, firstName, lastName } = createUserDto;

    // 1. Email Check
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // 2. Password Hash
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // --- FIX 1: 'user' variable scope ---
    // 'user'-ai veliye define seiyungal
    let user; 

    try {
      // 3. User Creation
      // veliye define seitha 'user'-il assign seiyungal
      user = await this.usersService.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      // --- FIX 2: Early Return ---
      // Intha 'return result' line-ai ingirunthu neekki vidungal (remove)
      // const { password, ...result } = user.toObject();
      // return result; // <-- ITHU IRUKKA KUDAATHU

    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }

    // Ippothu, 'user' variable intha idathil 'theriyum' (is in scope)

    // 4. Email Verification Token
    const payload = { email: user.email, sub: user._id };
    const verificationToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>(
        'JWT_VERIFICATION_SECRET',
      ),
      // --- FIX 3: 'expiresIn' Type Error ---
      // <string> generic-ai neekkungal
      expiresIn: this.configService.getOrThrow(
        'JWT_VERIFICATION_EXPIRES_IN',
      ),
    });

    // 5. Verification URL
    const frontendUrl = this.configService.getOrThrow<string>('FRONTEND_URL');
    const verificationUrl = `${frontendUrl}/auth/verify-email?token=${verificationToken}`;

    // 6. Send Email
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Welcome! Please Verify Your Email',
        template: './email-verification',
        context: {
          firstName: user.firstName,
          verificationUrl: verificationUrl,
        },
      });
    } catch (error) {
      console.error('Error sending verification email:', error);
      // Ippothu user-ai create seithu vittom, aanaal email poga villai.
      // Ithu oru periya vishayam, aanaal ippothaikku ippadiye viduvom.
      throw new InternalServerErrorException('Error sending verification email');
    }

    // 7. Final Response
    return {
      message:
        'Registration successful. Please check your email for verification.',
    };
  }

  /**
   * ஒரு user-ஐ login செய்து, JWT-ஐ வழங்குகிறது (Updated)
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. User-ஐ email மூலம் தேடவும்
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Password-ஐ ஒப்பிடவும்
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. படி 3: Email verified-ஆ எனச் சோதிக்கவும் (புதியது)
    if (!user.isEmailVerified) {
      // 4. Email verify ஆகவில்லை என்றால், பிழை அனுப்பவும்
      throw new UnauthorizedException(
        'Email not verified. Please check your inbox.',
      );
    }

    // 5. Email verified ஆக இருந்தால், JWT-ஐ உருவாக்கவும்
    const payload = {
      sub: user._id,
      email: user.email,
    };

    // 6. Token-ஐ Sign செய்து, திருப்பி அனுப்பவும்
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * GET /auth/verify-email
   * Email verification token-ஐச் சரிபார்க்கிறது
   */
  async verifyEmail(token: string) {
    let payload;
    try {
      // 2. படி 1: Token-ஐச் சரிபார்க்கவும் (Verify)
      payload = this.jwtService.verify(token, {
        secret: this.configService.getOrThrow<string>(
          'JWT_VERIFICATION_SECRET',
        ),
      });
    } catch (error) {
      // 3. Token தவறாக இருந்தால் (expired or invalid)
      throw new BadRequestException('Invalid or expired verification token');
    }

    // 4. படி 2: Payload-லிருந்து email-ஐ எடுக்கவும்
    const { email } = payload;

    // 5. படி 3: User-ஐத் தேடவும்
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // 6. படி 4: User-இன் isEmailVerified-ஐ true என மாற்றவும்
    user.isEmailVerified = true;
    await user.save(); // Mongoose document-ல் .save() method-ஐ அழைக்கவும்

    // 7. படி 5: User-க்கு ஒரு செய்தியைத் திருப்பி அனுப்பவும்
    return {
      message: 'Email verified successfully. You can now log in.',
    };
  }
}