import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import PrismaService from 'src/common/database/prisma/prisma.service';
import { UserContextService } from 'src/common/context.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserContextService],
  exports: [UsersService]
})
export class UsersModule {}
