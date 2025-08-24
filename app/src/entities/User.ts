import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { Item } from "./Item";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 40, unique: true,})
    username: string;

    @Column({type: "varchar", length: 40, unique: true,})
    email: string;

    @Column({type: "varchar", length: 20})
    password: string;

    @Column({type: "varchar", length: 20})
    phone: string;

    
    @OneToMany(() => Item, (item) => item.user, { onDelete: 'CASCADE',cascade: ["update","remove"] }) // 'post.user' is the inverse side in the Post entity
    @JoinColumn()
    items: Item[];

    @Column({ default: true, type:"boolean" })
    isEnabled: boolean;

    @Column({ type: "int", default: 0 })
    failedLogins: number;

    @CreateDateColumn()
    createdAt!: Date; // This column will automatically store the creation date

    @UpdateDateColumn()
    updatedAt!: Date; // This column will automatically store the last update date

    constructor(id :number, username : string, email : string, password : string, phone: string ){
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.isEnabled = true;
        this.failedLogins = 0;
        this.items = [];
    }
}




