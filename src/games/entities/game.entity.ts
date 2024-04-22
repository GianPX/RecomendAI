import { ReviewedGame } from "src/python-api/entities/reviewed-games.entity";
import { UnReviewedGame } from "src/python-api/entities/unreviewed-games.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('games')
export class Game {
    @PrimaryGeneratedColumn('increment')
    id:                 number;

    @Column('text', {
        unique: true
    })
    slug:               string;

    @Column('text', {
        unique: true
    })
    name:               string;

    @Column('date', {
        nullable: true
    })
    released:           Date;

    @Column('text', {
        nullable: true
    })
    background_image:   string;

    @Column('float', {
        nullable: true
    })
    rating:             number;

    @Column('float', {
        nullable: true
    })
    rating_top:         number;

    @Column('int', {
        nullable: true
    })
    ratings_count:      number;

    @Column('float', {
        nullable: true
    })
    metacritic:         number;

    @Column('int', {
        nullable: true
    })
    playtime:           number;

    @Column('date', {
        nullable: true
    })
    updated:            string;

    @Column('text', {
        array: true,
        nullable: true
    })
    platforms:          string[];

    @Column('text', {
        array: true,
        nullable: true
    })
    genres:             string[];

    @Column('text', {
        array: true,
        nullable: true
    })
    stores:             string[];

    @Column('text', {
        array: true,
        nullable: true
    })
    tags:               string[];

    @Column('text', {
        nullable: true
    })
    esrb_rating:        string;

    @OneToMany(
        () => ReviewedGame,
        (reviewedGame) => reviewedGame.idGame,
        {cascade: true}
    )
    review: ReviewedGame

    @OneToMany(
        () => UnReviewedGame,
        (unreviewedGame) => unreviewedGame.idGame,
        { cascade: true }
    )
    unReview: UnReviewedGame
}

