import { Entity, PrimaryGeneratedColumn, Column, JoinColumn,CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    //@JoinColumn({ name: 'userId' }) // Customize foreign key column name
    @ManyToOne(() => User, (user) => user.items, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdAt!: Date; // This column will automatically store the creation date

    @UpdateDateColumn()
    updatedAt!: Date; // This column will automatically store the last update date


    constructor(id :number, user: User, name: string){
        this.id = id;
        this.user = user;
        this.name = name
    }

}


