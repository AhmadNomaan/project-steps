import { ApiProperty, OmitType } from "@nestjs/swagger";
import { users } from "@prisma/client";

export class UserEntity implements users {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    created_at: Date;
    @ApiProperty()
    updated_at: Date;
    @ApiProperty()
    owned_company_id: string;
    @ApiProperty()
    companies: string[];
}

export class UserReturnEntity extends OmitType(UserEntity, ['password']) {}