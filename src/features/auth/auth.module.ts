import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppConfig } from 'src/common/constants';
import { JwtStrategy } from './jwt.strategy';
import PrismaService from 'src/common/database/prisma/prisma.service';
import { UserContextService } from 'src/common/context.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: AppConfig.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1800s' },
    }),
  ], 
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, PrismaService, UserContextService],
})
export class AuthModule { }
