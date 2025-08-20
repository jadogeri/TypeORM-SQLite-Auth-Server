import { IEmail } from "./IEmail";
import { IPassword } from "./IPassword";

export interface IUserDeactivated extends IEmail, IPassword {
    confirm : boolean;

}