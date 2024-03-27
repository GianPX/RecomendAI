import { ApiProperty } from "@nestjs/swagger"

export class Recommendation {
    @ApiProperty()
    recommendationId: number

    @ApiProperty()
    imageUrl: string

    @ApiProperty()
    game: string

    @ApiProperty()
    tags: string[]

    @ApiProperty()
    released: string
}