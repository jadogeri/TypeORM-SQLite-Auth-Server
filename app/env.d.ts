import { IUser } from "./src/interfaces/IUser";
import { IUserLogin } from "./src/interfaces/IUserLogin";
import { IJwtPayload } from "./src/interfaces/IJWTPayload";
import { IUserAuthorized } from "./src/interfaces/IUserAuthorized";

declare global {
    namespace Express {
      interface Request {
        user: {
            username:string;
            email:string
            id:number
        },
        body: IUser | IUserLogin | IUserAuthorized  //| IUserReset | IUserDeactivated | IUserForgot | IUserAuthorized
      }
    }
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: string;
        DATABASE: string;
        JSON_WEB_TOKEN_SECRET: string;
        BCRYPT_SALT_ROUNDS : string;
        BASE_URL : string;
        NANOID_SIZE : string;
        PORT: number;
        NODEMAILER_USERNAME : string;
        NODEMAILER_PASSWORD : string;
        TWILIO_ACCOUNT_SID : string;
        TWILIO_AUTH_TOKEN : string;
        TWILIO_PHONE_NUMBER : string;
        COMPANY : string;
      }
    }
  }

  export {}

