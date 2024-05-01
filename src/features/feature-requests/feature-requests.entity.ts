import { ApiProperty, PickType } from "@nestjs/swagger";
import { Prisma, feature_request } from "@prisma/client";
import { UserReturnEntity } from "../users/users.entity";
import { PageMetaDto } from "src/common/query-params";

export class FeatureRequestEntity implements feature_request{
        
    @ApiProperty()
    id: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    attachment_count: number;
    @ApiProperty()
    status: string;
    @ApiProperty()
    tags: string[];
    @ApiProperty()
    votes: number;
    @ApiProperty()
    submitted_by_id: string;
    @ApiProperty()
    created_at: Date;
    @ApiProperty()
    updated_at: Date;
    @ApiProperty()
    company_id: string;
    @ApiProperty()
    status_updated_by_id: string;
    @ApiProperty()
    status_history: Prisma.JsonValue[];
}

export class FeatureRequestWithSubmittedByEntity extends FeatureRequestEntity {
    @ApiProperty({type: UserReturnEntity})
    submitted_by: UserReturnEntity
}

export class GetFeatureRequestReturnEntity {
    @ApiProperty({type:FeatureRequestWithSubmittedByEntity, isArray: true })
    data:  FeatureRequestWithSubmittedByEntity
    @ApiProperty({type: PageMetaDto, isArray: false})
    meta: PageMetaDto
}