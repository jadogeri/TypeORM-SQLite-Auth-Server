import { IEmail } from "./IEmail";

export interface IUserReset extends IEmail {
    old_password: string;
    new_password : string;
}