/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 24-AUG-2025
 * @description function to delete a single user in database
 */


const asyncHandler = require("express-async-handler");
import { Response, Request } from 'express';
import { IUserDeactivated } from '../../interfaces/IUserDeactivated';
import { errorBroadcaster } from "../../utils/errorBroadcaster";
import * as userService from "../../services/userService"
import * as bcrypt from "bcrypt"
import Validator from '@josephadogeridev/auth-credential-validator-ts';
import exceptionHandler from '../../utils/exceptionHandler';


/**
*@desc Deactivate a user
*@route POST /api/users/deactivate
*@access public
*/

export const deactivateUser = asyncHandler(async (req: Request, res : Response) => {

  const { email, password, confirm}: IUserDeactivated = req.body
  if (!email || !password || confirm == undefined) {
    console.log(email,password,confirm);
    errorBroadcaster(res,400,"All fields are mandatory!");
  }
  const validator = new Validator("",email as string,"");

  if(!validator.validateEmail()){
    errorBroadcaster(res,400,"not a valid email");
  }

  if(confirm!== true){
    errorBroadcaster(res,400,"confirm must be true");
  }
  try{
    const registeredUser = await userService.getByEmail(email as string);
    if(!registeredUser){
      errorBroadcaster(res,400,"Email does not exist");
    }
    if(!(await bcrypt.compare(password as string,registeredUser?.password as string))) {
      errorBroadcaster(res,400,"Invalid password or email");
    }
    await userService.remove(registeredUser!.id)
    res.json({ message: `deactivated acoount with email ${email}` });
  }catch(error : unknown){
    exceptionHandler(error, errorBroadcaster, res);  
  }
});



