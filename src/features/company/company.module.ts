import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import PrismaService from 'src/common/database/prisma/prisma.service';
import { UserContextService } from 'src/common/context.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService, UserContextService],
})
export class CompanyModule {}
