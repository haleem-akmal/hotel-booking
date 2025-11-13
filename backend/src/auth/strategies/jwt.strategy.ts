// src/auth/strategies/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'; // 1. passport-jwt-லிருந்து Import செய்யவும்
import { ConfigService } from '@nestjs/config'; // 2. Secret key-ஐப் படிக்க
import { UsersService } from 'src/users/users.service'; // 3. User-ஐத் தேட

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { // 4. Strategy-ஐ extend செய்யவும்
  
  constructor(
    private configService: ConfigService, // 5. ConfigService-ஐ Inject செய்யவும்
    private usersService: UsersService,   // 6. UsersService-ஐ Inject செய்யவும்
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      
      // FIX: .get() ஐ .getOrThrow() என மாற்றவும்
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  /**
   * 10. Token-ஐச் சரிபார்த்த பிறகு, இந்த function இயங்கும்
   * @param payload Token-ல் இருந்து decode செய்யப்பட்ட payload
   */
  async validate(payload: { sub: string; email: string }) {
    
    // 11. Payload-ல் உள்ள ID-ஐ வைத்து user-ஐத் தேடவும்
    const user = await this.usersService.findOneById(payload.sub); // (இந்த findOneById-ஐ நாம் UsersService-ல் உருவாக்க வேண்டும்)

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // 12. User object-ஐத் திருப்பி அனுப்பவும்
    // (Nest.js இதை req.user-ல் இணைக்கும்)
    return user; 
  }
}