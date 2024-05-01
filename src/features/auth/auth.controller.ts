import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignInReturnEntity, SignUpDto } from './auth.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiCreatedResponse({type: SignInReturnEntity, isArray: false})
  async userSignIn(@Body() dto: SignInDto) {
    return await this.authService.userSignIn(dto.email, dto.password)
  }

  @Post('signup')
  @ApiCreatedResponse({type: SignInReturnEntity, isArray: false})
  async userSignUp(@Body() dto: SignUpDto){
    return this.authService.userSignUp(dto)
  }
}
