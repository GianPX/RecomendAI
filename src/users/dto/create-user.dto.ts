import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    @ApiProperty()
    email: string

    @IsString()
    @MinLength(1)
    @ApiProperty()
    fullName: string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    /*@Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })*/
    @ApiProperty()
    password: string
}
