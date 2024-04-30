import { Module } from '@nestjs/common';
import { FeatureRequestsService } from './feature-requests.service';
import { FeatureRequestsController } from './feature-requests.controller';
import PrismaService from 'src/common/database/prisma/prisma.service';

@Module({
  controllers: [FeatureRequestsController],
  providers: [FeatureRequestsService, PrismaService],
})
export class FeatureRequestsModule {}
