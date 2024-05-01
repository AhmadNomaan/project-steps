import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsOptional } from "class-validator"
import { PageOptionsDto } from "src/common/query-params"

export enum FeatureRequestStatusEnum {
    SUBMITTED = 'submitted',
    UNDERCONSIDERATION = 'under_consideration',
    ACCEPTED = 'accepted', 
    REJECTED = 'rejected',
    REDUNDANT = 'redundant'

}

export class CreateFeatureRequestDto{
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string
    @ApiProperty({type: String, isArray: true})
    tags: Array<string>
}

export class GetFeatureQueryDto extends PageOptionsDto{
    @ApiProperty({enum: FeatureRequestStatusEnum, required: false})
    @IsEnum(FeatureRequestStatusEnum)
    @IsOptional()
    status: FeatureRequestStatusEnum
}

export class VoteFeatureRequestDto {
    @ApiProperty()
    featureRequestId: string
}

export class UpdateFeatureRequestDto {
    @ApiProperty({enum: FeatureRequestStatusEnum, default: FeatureRequestStatusEnum.UNDERCONSIDERATION})
    @IsEnum(FeatureRequestStatusEnum)
    status: FeatureRequestStatusEnum
}