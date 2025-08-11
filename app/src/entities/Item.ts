import { Entity, PrimaryGeneratedColumn, Column,OneToOne, JoinColumn,CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneToOne(()=> User)
    @JoinColumn() 
    user: User;

    @CreateDateColumn()
    createdAt!: Date; // This column will automatically store the creation date

    @UpdateDateColumn()
    updatedAt!: Date; // This column will automatically store the last update date


    constructor(id :number, user: User, token: string){
        this.id = id;
        this.user = user;
        this.token = token
    }

}