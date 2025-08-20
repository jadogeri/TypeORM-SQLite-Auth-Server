import { User } from "../entities/User"
import { IID } from "./IID"
import {IToken} from "./IToken"

export interface IAuth extends IToken, IID {
    user?: User
}
