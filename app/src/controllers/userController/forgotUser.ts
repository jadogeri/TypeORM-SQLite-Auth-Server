/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 24-AUG-2025
 * @description function to begin access account;
 */

import { Response, Request } from 'express';
import { IUserForgot } from '../../interfaces/IUserForgot';
import * as userService from "../../services/userService"
import { errorBroadcaster } from "../../utils/errorBroadcaster";
import * as bcrypt from "bcrypt"
const asyncHandler = require("express-async-handler");
import { generateRandomUUID } from '../../utils/generateRandomUUID';
import Validator from '@josephadogeridev/auth-credential-validator-ts';
import { User } from '../../entities/User';
import exceptionHandler from '../../utils/exceptionHandler';


/**
*@desc Forgot a user
*@route POST /api/users/forgot
*@access public
*/

export const forgotUser = asyncHandler(async (req: Request, res : Response) => {

  const { email} : IUserForgot = req.body;
  if (!email ) {
    res.status(400);
    throw new Error("Email is mandatory!");
  }
  const validator = new Validator("", email as string,"")

  if(!validator.validateEmail()){
    errorBroadcaster(res,400,"not a  valid email")
  }

  try{
    const user  = await userService.getByEmail(email);
    if (!user) {
      errorBroadcaster(res,400,`Invalid Email ${email}`);
    }else{
      //generate unique password
      const size : number = parseInt(process.env.NANOID_SIZE as string);
      
      // Using the alphanumeric dictionary
      const uuid = generateRandomUUID(size)  

      console.log("uuid === ", uuid);
      //hash generated password
      const hashedPassword : string = await bcrypt.hash(uuid , parseInt(process.env.BCRYPT_SALT_ROUNDS as string));
      console.log("Hashed Password: ", hashedPassword);
      //store generated password in database and unlock account
      const updatedUser : User = {...user, password : hashedPassword, failedLogins : 0, isEnabled : true }

      await userService.update(updatedUser)
      //update user password with uuid
      .then(()=>{
        res.status(200).json({ password: uuid });
      })
    }
  }catch(error : unknown){
    exceptionHandler(error, errorBroadcaster, res);  
  }
});

