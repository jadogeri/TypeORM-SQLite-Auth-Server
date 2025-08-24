import { Entity, PrimaryGeneratedColumn, OneToOne, Column, JoinColumn, CreateDateColumn, UpdateDateColumn  } from "typeorm";
import { User } from "./User";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneToOne(()=> User, { onDelete: 'CASCADE' })
    @JoinColumn() 
    user: User;

    @CreateDateColumn()
    createdAt!: Date; // This column will automatically store the creation date

    @UpdateDateColumn()
    updatedAt!: Date; // This column will automatically store the last update date
    

    constructor(id :number, user: User, token: string){
        this.id = id;
        this.user = user;
        this.token = token;
    }

}
