import { IEmail } from "./IEmail";
import { IPassword } from "./IPassword";

export interface IUser extends IEmail, IPassword {
    username?: string;
    phone? : string;

}