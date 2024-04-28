import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeatureRequestsService } from './feature-requests.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('feature-requests')
@ApiTags('Feature Requests')
export class FeatureRequestsController {
  constructor(private readonly featureRequestsService: FeatureRequestsService) {}

 
}
