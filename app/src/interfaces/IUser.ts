import { IEmail } from "./IEmail";
import { IID } from "./IID";
import { IPassword } from "./IPassword";

export interface IUser extends IEmail, IPassword, IID {
    username?: string;
    phone? : string;
    isEnabled?: boolean;
    failedLogins?: number;

}