import { Module } from '@nestjs/common';
import { FeatureRequestsService } from './feature-requests.service';
import { FeatureRequestsAdminController, FeatureRequestsController } from './feature-requests.controller';
import PrismaService from 'src/common/database/prisma/prisma.service';
import { UserContextService } from 'src/common/context.service';

@Module({
  controllers: [FeatureRequestsController, FeatureRequestsAdminController],
  providers: [FeatureRequestsService, PrismaService, UserContextService],
})
export class FeatureRequestsModule {}
