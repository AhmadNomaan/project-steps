import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { FeatureRequestsService } from './feature-requests.service';
import { ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiParam, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CreateFeatureRequestDto, GetFeatureQueryDto, UpdateFeatureRequestDto, VoteFeatureRequestDto } from './feature-requests.dto';
import { PageOptionsDto, SuccessEntity } from 'src/common/query-params';
import { FeatureRequestEntity, GetFeatureRequestReturnEntity } from './feature-requests.entity';
import { UserContextService } from 'src/common/context.service';
import { BaseAuthController } from 'src/common/base-auth.controller';
import { CustomErrorMessages } from 'src/common/error-messages';

@Controller('feature-requests')
@ApiTags('Feature Requests')
export class FeatureRequestsController extends BaseAuthController {
  constructor(private readonly featureRequestsService: FeatureRequestsService, private readonly contextService: UserContextService) {
    super()
  }

  @Post(':company_id')
  @ApiCreatedResponse({ type: SuccessEntity })
  async createFeatureRequest(@Param('company_id') company_id: string, @Body() dto: CreateFeatureRequestDto) {
    const user = this.contextService.userContext
    return await this.featureRequestsService.createFeatureRequest(company_id, dto, user)
  }

  @Get(':company_id')
  @ApiOkResponse({ type: GetFeatureRequestReturnEntity })
  async getFeatureRequests(@Param('company_id') company_id: string, @Query() pageOptionsDto: GetFeatureQueryDto) {
    return await this.featureRequestsService.getFeatureRequests(company_id, pageOptionsDto)
  }

  @Post(':company_id/vote-feature-request')
  @ApiCreatedResponse({ type: SuccessEntity })
  async voteFeatureRequest(@Param('company_id') company_id: string, @Body() dto: VoteFeatureRequestDto) {
    const user = this.contextService.userContext
    return await this.featureRequestsService.voteFeatureRequest(company_id, dto, user)
  }

}


@Controller('feature-requests-admin')
@ApiTags('Feature Requests Admin')
export class FeatureRequestsAdminController extends BaseAuthController {
  constructor(private readonly featureRequestsService: FeatureRequestsService, private readonly contextService: UserContextService) {
    super()
  }

  @Get()
  @ApiOkResponse({ type: GetFeatureRequestReturnEntity })
  async getFeatureRequests(@Query() pageOptionsDto: GetFeatureQueryDto) {
    const user = this.contextService.userContext
    return await this.featureRequestsService.getFeatureRequests(user.company_id, pageOptionsDto)
  }

  @Patch('update-status/:feature_request_id')
  @ApiOkResponse({type: SuccessEntity})
  async updateFeatureRequestStatus(@Param('feature_request_id') featureRequestId: string, @Body() dto: UpdateFeatureRequestDto) {
    const user = this.contextService.userContext

    const featureRequest: FeatureRequestEntity = await this.featureRequestsService.getFeatureRequestById(featureRequestId)

    if(!featureRequest || featureRequest.company_id !== user.company_id) 
      throw new BadRequestException(CustomErrorMessages.ENTITY_NOT_FOUND)

    return await this.featureRequestsService.updateFeatureRequestStatus(dto, featureRequest, user)
  }

}
