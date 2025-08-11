import { IEmail } from "./IEmail";

export interface IUser extends IEmail {
    username?: string;
    password? : string;
    phone? : string;

}