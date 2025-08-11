import { Entity, PrimaryGeneratedColumn, Column,OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(()=> User)
    @JoinColumn() 
    user: User;

    constructor(id :number, user: User){
        this.id = id;
        this.user = user;
    }

}