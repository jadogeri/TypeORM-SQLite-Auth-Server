import { Entity, PrimaryGeneratedColumn, Column,OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn  } from "typeorm";
import { User } from "./User";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(()=> User)
    @JoinColumn() 
    user: User;

    @CreateDateColumn()
    createdAt!: Date; // This column will automatically store the creation date

    @UpdateDateColumn()
    updatedAt!: Date; // This column will automatically store the last update date
    

    constructor(id :number, user: User){
        this.id = id;
        this.user = user;
    }

}