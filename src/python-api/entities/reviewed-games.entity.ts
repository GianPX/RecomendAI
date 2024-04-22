import { Game } from "src/games/entities/game.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('reviewed_games')
export class ReviewedGame {
    @PrimaryGeneratedColumn('increment')
    id:number
    
    @Column('boolean')
    review: boolean

    @ManyToOne(
        () => User,
        (user) => user.review
    )
    @Column({
        nullable: true
    })
    idUser: number

    @ManyToOne(
        () => Game,
        (game) => game.review
    )
    @Column({
        nullable: true
    })
    idGame: number
}
