import { Injectable } from '@nestjs/common';
import PrismaService from 'src/common/database/prisma/prisma.service';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/query-params';
import { Utilities } from 'src/common/utils';
import { CreateFeatureRequestDto, FeatureRequestStatusEnum, GetFeatureQueryDto, VoteFeatureRequestDto } from './feature-requests.dto';
import { FeatureRequestEntity } from './feature-requests.entity';
import { User_Context } from 'src/common/context.service';

@Injectable()
export class FeatureRequestsService {
    constructor(private dbService: PrismaService) { }

    async createFeatureRequest(company_id: string, dto: CreateFeatureRequestDto, user: User_Context) {
        try {
            const created = await this.dbService.$transaction(async () => {
                const request: FeatureRequestEntity = await this.dbService.feature_request.create({
                    data: {
                        id: Utilities.UUID(),
                        title: dto.title,
                        description: dto.description,
                        tags: dto.tags,
                        submitted_by_id: user.id,
                        status: FeatureRequestStatusEnum.SUBMITTED,
                        created_at: Utilities.currentUTC(),
                        updated_at: Utilities.currentUTC(),
                        company_id: company_id
                    }
                })

                await this.dbService.feature_request_vote_to_user_id.create({
                    data: {
                        id: Utilities.UUID(),
                        feature_request_id: request.id,
                        user_id: user.id
                    }
                })

                return request

            })
            return {
                success: true,
                message: 'Feature Request successfully submitted.'
            }
        } catch (error: any) {
            console.log('error', error)
            return {
                success: true,
                message: error.response.message
            }
        }
    }

    async getFeatureRequests(company_id, pageOptionsDto: GetFeatureQueryDto) {
        const featureRequests = await this.dbService.feature_request.findMany({
            where: {
                company_id: company_id,
                status: pageOptionsDto.status
            },
            take: pageOptionsDto.take,
            skip: pageOptionsDto.skip,
            orderBy: [
                {
                    created_at: pageOptionsDto.order
                }
            ]
        })

        const total = await this.dbService.feature_request.count({
            where: {
                company_id: company_id,
                status: pageOptionsDto.status
            }
        })

        const pageMetaDto = new PageMetaDto({ total, pageOptionsDto });

        return new PageDto(featureRequests, pageMetaDto);
    }

    async getFeatureRequestById(featureRequestId: string): Promise<FeatureRequestEntity> {
        return await this.dbService.feature_request.findUnique({
            where: {
                id: featureRequestId
            }
        })
    }

    async getFeatureRequestVotes(featureRequestId: string, voted_by_user_id: string, pageOptionsDto: PageOptionsDto,) {
        const votes = await this.dbService.feature_request_vote_to_user_id.findMany({
            where: {
                feature_request_id: featureRequestId,
                user_id: voted_by_user_id
            },
            take: pageOptionsDto.take,
            skip: pageOptionsDto.skip,
        })

        const total = await this.dbService.feature_request_vote_to_user_id.count({
            where: {
                feature_request_id: featureRequestId,
                user_id: voted_by_user_id
            }
        })

        const pageMetaDto = new PageMetaDto({ total, pageOptionsDto });

        return new PageDto(votes, pageMetaDto);
    }


    async voteFeatureRequest(company_id: string, dto: VoteFeatureRequestDto, user: User_Context) {
        const featureRequest = await this.getFeatureRequestById(dto.featureRequestId)

        const voteExists = await this.getFeatureRequestVotes(featureRequest.id, dto.voted_by_user_id, new PageOptionsDto())
        if (voteExists.meta.total > 0) {
            return {
                success: true,
                message: 'User has already voted.'
            }
        }

        try {

            await this.dbService.$transaction(async () => {
                await this.dbService.feature_request_vote_to_user_id.create({
                    data: {
                        id: Utilities.UUID(),
                        feature_request_id: featureRequest.id,
                        user_id: user.id
                    }
                })

                await this.dbService.feature_request.update({
                    where: {
                        id: featureRequest.id
                    },
                    data: {
                        votes: {
                            increment: 1
                        }
                    }
                })
            })

            return {
                success: true,
                message: 'Voted successfully.'
            }
        } catch (error) {
            console.log('error', error)
            return {
                success: false, 
                message: error.response.message
            }
        }

    }


}
