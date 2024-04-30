import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FeatureRequestsService } from './feature-requests.service';
import { ApiCreatedResponse, ApiExtraModels, ApiParam, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CreateFeatureRequestDto, GetFeatureQueryDto, VoteFeatureRequestDto } from './feature-requests.dto';
import { PageOptionsDto, SuccessEntity } from 'src/common/query-params';
import { FeatureRequestEntity } from './feature-requests.entity';

@Controller('feature-requests')
@ApiTags('Feature Requests')
export class FeatureRequestsController {
  constructor(private readonly featureRequestsService: FeatureRequestsService) { }

  @Post(':company_id')
  @ApiCreatedResponse({type: SuccessEntity})
  async createFeatureRequest(@Param('company_id') company_id: string, @Body() dto: CreateFeatureRequestDto) {
    return await this.featureRequestsService.createFeatureRequest(company_id, dto)
  }

  @Get(':company_id')
  async getFeatureRequests(@Param('company_id') company_id: string, @Query() pageOptionsDto: GetFeatureQueryDto){
    return await this.featureRequestsService.getFeatureRequests(company_id, pageOptionsDto)
  }

  @Post(':/company_id/vote-feature-request')
  async voteFeatureRequest(@Param('company_id') company_id: string, @Body() dto: VoteFeatureRequestDto){
    return await this.featureRequestsService.voteFeatureRequest(company_id, dto)
  } 

}
