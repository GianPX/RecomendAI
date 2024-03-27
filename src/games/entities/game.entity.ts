import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    platforms:          String[];

    @Column('text', {
        array: true,
        nullable: true
    })
    genres:             String[];

    @Column('text', {
        array: true,
        nullable: true
    })
    stores:             String[];

    @Column('text', {
        array: true,
        nullable: true
    })
    tags:               String[];

    @Column('text', {
        nullable: true
    })
    esrb_rating:        String;
}

