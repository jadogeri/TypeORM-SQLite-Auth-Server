/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

import { errorBroadcaster } from '../../utils/errorBroadcaster';
import { IUser } from '../../interfaces/IUser';

const asyncHandler = require("express-async-handler");
import { Response } from 'express';

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
  // if(!isValidEmail(email as string)){
  //   errorBroadcaster(res,553,"not a  valid email")

  // }
  // if(!isValidUsername(username as string)){
  //   errorBroadcaster(res,400,"not a valid username")

  // }
  // if(!isValidPassword(password as string)){
  //   errorBroadcaster(res,400,"not a valid password")
  // }  

  res.status(200).json({"message": "register new user"});
});