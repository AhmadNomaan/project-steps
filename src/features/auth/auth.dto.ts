import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, Matches } from "class-validator";

export class SignInDto {
    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
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