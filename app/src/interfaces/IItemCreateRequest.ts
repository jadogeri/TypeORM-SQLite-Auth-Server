import { IID } from "./IID";
import { IJwtPayload } from "./IJWTPayload";
export interface IItemCreateRequest extends IJwtPayload, IID {
    
  name : string
}