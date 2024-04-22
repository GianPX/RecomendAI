import { Game } from "src/games/entities/game.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('unreviewed_games',
    
)
export class UnReviewedGame {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('int', {
        nullable: true
    })
    score: number

    @ManyToOne(
        () => User,
        (user) => user.unReview
    )
    @Column({
        nullable: true
    })
    idUser: number

    @ManyToOne(
        () => Game,
        (game) => game.unReview
    )
    @Column({
        nullable: true
    })
    idGame: number
}