import { User } from "../entities/User"
import { IID } from "./IID"
export interface IItem  extends IID{
    user?: User
    name : string
}

import {IToken} from "./IToken"

export interface IAuth extends IToken, IID {
    user?: User
}
