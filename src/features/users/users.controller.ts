import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/query-params';
import { BaseAuthController } from 'src/common/base-auth.controller';

@Controller('users')
@ApiTags('users')
export class UsersController extends BaseAuthController{
  constructor(private readonly usersService: UsersService) {
    super()
  }

  @Post()
  async createUser() {
    
  }
  
  @Get()
  async getUsers(@Query() query: PageOptionsDto) {
    return await this.usersService.getUsers(query)
  }
  
  
}
