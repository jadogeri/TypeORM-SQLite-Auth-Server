import { IEmail } from "./IEmail";
import { IPassword } from "./IPassword";

export interface IUser extends IEmail, IPassword {
    username?: string;
    phone? : string;
    id: number;

    @Column({type: "varchar", length: 40, unique: true,})
    username: string;

    @Column({type: "varchar", length: 40, unique: true,})
    email: string;

    @Column({type: "varchar", length: 20})
    password: string;

    @Column({type: "varchar", length: 20})
    phone: string;

    @Column({ default: true, type:"boolean" })
    isEnabled: boolean;

    @Column({ type: "int", default: 0 })
    failedLogins: number;

}