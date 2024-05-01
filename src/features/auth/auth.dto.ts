import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, Matches } from "class-validator";
import { UserEntity, UserReturnEntity } from "../users/users.entity";

export class SignInDto {
    @ApiProperty({ example: 'nomaan@yopmail.com' })
    @IsEmail()
    email: string

    @ApiProperty({ example: 'nomaan@yopmail.com' })
    @Length(8)
    password: string
}

export class SignUpDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @Length(8)
    password: string
}

export class SignInReturnEntity {
    @ApiProperty()
    accessTkn: string
    @ApiProperty()
    refTkn: string
    @ApiProperty({type: UserReturnEntity, isArray: false})
    user: UserReturnEntity
}