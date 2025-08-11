declare global {
    namespace Express {
      interface Request {
        user: {
            username:string;
            email:string
        },
        // body: IUser | IUserReset | IUserDeactivated | IUserForgot | IUserAuthorized
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
        PORT: string;
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

