import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
