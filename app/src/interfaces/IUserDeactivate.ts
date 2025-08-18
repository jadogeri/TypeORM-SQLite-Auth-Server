import { IEmail } from "./IEmail";
import { IPassword } from "./IPassword";

export interface IUserDeactivate extends IEmail, IPassword {
    confirm : boolean;

}