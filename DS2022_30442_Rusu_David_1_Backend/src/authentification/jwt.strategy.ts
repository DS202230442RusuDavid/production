import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from '../user/user.service';
import TokenPayload from './tokenPayload.interface';
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        console.log("JWT FROM REQUEST IS: " + request?.cookies?.Authentication);
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: configService.get('JWT_SECRET')
    });
  }
 
  async validate(payload: TokenPayload) {
    console.log("VALIDATE USER ID IS: " + payload.userId);
    return this.userService.getById(payload.userId);
  }
}