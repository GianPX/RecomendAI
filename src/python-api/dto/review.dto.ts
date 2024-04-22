import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";


export class ReviewDto {

    @IsNumber()
    @ApiProperty()
    userId: number

    @IsNumber()
    @ApiProperty()
    gameId:number

    @IsBoolean()
    @ApiProperty()
    review: boolean
}