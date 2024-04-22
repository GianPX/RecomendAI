import { ApiProperty } from "@nestjs/swagger";
import { ReviewedGame } from "src/python-api/entities/reviewed-games.entity";
import { UnReviewedGame } from "src/python-api/entities/unreviewed-games.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    id: number

    @ApiProperty()
    @Column('text', {
        unique: true
    })
    email: string

    @Column('text', {
        select: false
    })
    password: string

    @ApiProperty()
    @Column('text')
    fullName: string

    @OneToMany(
        () => ReviewedGame,
        (reviewedGame) => reviewedGame.idUser,
        { cascade: true }
    )
    review: ReviewedGame

    @OneToMany(
        () => UnReviewedGame,
        (unreviewedGame) => unreviewedGame.idUser,
        { cascade: true }
    )
    unReview: UnReviewedGame
}
