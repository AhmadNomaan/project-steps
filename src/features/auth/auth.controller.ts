import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async userSignIn(@Body() dto: SignInDto) {
    return await this.authService.userSignIn(dto.email, dto.password)
  }

  @Post('signup')
  async userSignUp(@Body() dto: SignUpDto){
    return this.authService.userSignUp(dto)
  }
}
