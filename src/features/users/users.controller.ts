import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/query-params';
import { BaseAuthController } from 'src/common/base-auth.controller';
import { UserContextService } from 'src/common/context.service';
import { UserReturnEntity } from './users.entity';

@Controller('users')
@ApiTags('users')
export class UsersController extends BaseAuthController{
  constructor(private readonly usersService: UsersService, private readonly contextService: UserContextService) {
    super()
  }

  @Get()
  async getUsers(@Query() query: PageOptionsDto) {
    const user = this.contextService.userContext
    return await this.usersService.getUsers(user.company_id, query)
  }

  @Get('me')
  @ApiOkResponse({type: UserReturnEntity})
  async getCurrentUser(){
    const user = this.contextService.userContext
    return await this.usersService.getCurrentUser(user)
  }
}
