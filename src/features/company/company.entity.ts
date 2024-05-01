import { ApiProperty } from "@nestjs/swagger";
import { company } from "@prisma/client";

export class CompanyEntity implements company {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    country: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    created_by_id: string;
    @ApiProperty()
    created_at: Date;
    @ApiProperty()
    updated_at: Date;
    @ApiProperty()
    admin_id: string;
    
}