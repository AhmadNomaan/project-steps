import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AppConfig } from 'src/common/constants';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/users.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AppConfig.JWT_SECRET_KEY,
    });
  }

  async validate(payload: UserEntity) {
    return await this.userService.validateUser(payload.id);
  }
}