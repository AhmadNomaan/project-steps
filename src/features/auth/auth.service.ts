import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from 'src/common/constants';
import { UserEntity } from '../users/users.entity';
import * as argon2 from 'argon2'
import PrismaService from 'src/common/database/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private dbService: PrismaService,
    private jwtService: JwtService
  ) { }

  async generateJwtToken(user: UserEntity) {
    const accessToken = await this.jwtService.signAsync(
      { ...user },
      { secret: AppConfig.JWT_SECRET_KEY, expiresIn: 60 * 60 },
    );
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id },
      { secret: AppConfig.JWT_SECRET_KEY, expiresIn: 3600 * 48 },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async getUserForAuth(email: string): Promise<UserEntity | null> {
    return await this.dbService.users.findUnique({
      where: {
        email: email
      },
    })
  }


  async userSignUp({ name, email, password }: SignUpDto) {

    const doesEmailExist = await this.dbService.users.findUnique({
      where: {
        email: email
      }
    })

    if (doesEmailExist)
      throw new ForbiddenException('email already signed up!')

    const hashedPw = await argon2.hash(password)

    await this.dbService.users.create({
      data: {
        name: name,
        email: email,
        password: hashedPw,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    })

    return await this.userSignIn(email, password)
  }

  async userSignIn(email: string, password: string) {
    const user = await this.getUserForAuth(email)

    if (!user)
      throw new BadRequestException('email does not exist.')


    const doesPasswordMatch = await argon2.verify(user.password, password)

    if (!doesPasswordMatch)
      throw new ForbiddenException('Invalid password. Please try again.')

    delete user.password

    const { accessToken, refreshToken } = await this.generateJwtToken(user)

    return {
      accessTkn: accessToken,
      refTkn: refreshToken,
      user: user
    }

  }

}


