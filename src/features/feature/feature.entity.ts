import { ApiProperty } from '@nestjs/swagger';
import { feature_request } from '@prisma/client'

export class FeatureRequestEntity implements feature_request {
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

}