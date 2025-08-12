import { IEmail } from "./IEmail";

export interface IUserDeactivate extends IEmail {
    password: string;
    confirm : boolean;

}