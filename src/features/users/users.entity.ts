import { ApiProperty } from "@nestjs/swagger";
import { users } from "@prisma/client";

export class UserEntity implements users {
    name: string;
    @ApiProperty()
    id: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    created_at: Date;
    @ApiProperty()
    updated_at: Date;
    @ApiProperty()
    company_id: string;
    @ApiProperty()
    is_admin: boolean;
}