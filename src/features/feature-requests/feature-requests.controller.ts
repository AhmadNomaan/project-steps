import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FeatureRequestsService } from './feature-requests.service';
import { ApiCreatedResponse, ApiExtraModels, ApiParam, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CreateFeatureRequestDto, GetFeatureQueryDto, VoteFeatureRequestDto } from './feature-requests.dto';
import { PageOptionsDto, SuccessEntity } from 'src/common/query-params';
import { FeatureRequestEntity } from './feature-requests.entity';
import { UserContextService } from 'src/common/context.service';

@Controller('feature-requests')
@ApiTags('Feature Requests')
export class FeatureRequestsController {
  constructor(private readonly featureRequestsService: FeatureRequestsService, private readonly contextService: UserContextService) { }

  @Post(':company_id')
  @ApiCreatedResponse({type: SuccessEntity})
  async createFeatureRequest(@Param('company_id') company_id: string, @Body() dto: CreateFeatureRequestDto) {
    const user = this.contextService.userContext
    return await this.featureRequestsService.createFeatureRequest(company_id, dto, user)
  }

  @Get(':company_id')
  async getFeatureRequests(@Param('company_id') company_id: string, @Query() pageOptionsDto: GetFeatureQueryDto){
    return await this.featureRequestsService.getFeatureRequests(company_id, pageOptionsDto)
  }

  @Post(':/company_id/vote-feature-request')
  async voteFeatureRequest(@Param('company_id') company_id: string, @Body() dto: VoteFeatureRequestDto){
    const user = this.contextService.userContext
    return await this.featureRequestsService.voteFeatureRequest(company_id, dto, user)
  } 

}
