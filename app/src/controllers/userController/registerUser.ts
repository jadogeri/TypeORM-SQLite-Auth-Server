/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

import { errorBroadcaster } from '../../utils/errorBroadcaster';
import { IUser } from '../../interfaces/IUser';
import * as userService from "../../services/userService"
const asyncHandler = require("express-async-handler");
import { Response } from 'express';
import Validator from '@josephadogeridev/auth-credential-validator-ts';
import {hash} from "bcrypt";
import { isValidatePhoneNumber } from '../../utils/isValidPhoneNumber';
import exceptionHandler from '../../utils/exceptionHandler';


/**
*@desc resgiter new user
*@route POST /api/users/register
*@access private
*/

export const registerUser = asyncHandler(async (req : Request, res: Response) => {
  console.log( "calling register request")

  const { username, email, password, phone} : IUser  = req.body as IUser;
  console.log("data from request == ",username, email, password, phone)
  
  if (!username || !email || !password) {
    errorBroadcaster(res,400,"All fields are mandatory!")
  }
  const validator = new Validator(username as string,email as string,password as string);

  console.log(validator.getCredential)
  if(!validator.validateEmail()){
    errorBroadcaster(res,553,"not a valid email")

  }
  if(!validator.validateUsername()){
    errorBroadcaster(res,400,"not a valid username")

  }
  if(!validator.validatePassword()){
    errorBroadcaster(res,400,"not a valid password")
  }  
//if phone number is provided check if string is a valid phone number
  if(phone){
    if(!isValidatePhoneNumber(phone )){
        errorBroadcaster(res,400,"not a valid phone number")
    }  
  }
  //Hash password
  const hashedPassword : string = await hash(password as string, parseInt(process.env.BCRYPT_SALT_ROUNDS as string));
  try{
    const createdUser = await userService.create({username, email, password : hashedPassword, phone})
    console.log("line 48",JSON.stringify(createdUser, null,2))
    res.status(200).json(createdUser);

  }catch(error : unknown){
    exceptionHandler(error, errorBroadcaster, res);
  
  }
});