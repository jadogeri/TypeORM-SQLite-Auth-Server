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
import { QueryFailedError } from 'typeorm';

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

try{
  const createdUser = await userService.create({username, email, password, phone})
    console.log("line 48",JSON.stringify(createdUser, null,2))
}catch(error : unknown){
    if (error instanceof QueryFailedError) {
      console.error("Database query failed:", error.message);
      // You can further inspect error.driverError for SQLite-specific details if available
      // For example, SQLite unique constraint violation might have a specific code or message
      if (error.message.includes("SQLITE_CONSTRAINT")) {
          console.error("Unique constraint violation detected.");
      }
    }else if (error instanceof Response) {
      // If the error is a Response object (from `throw response` above)
      error.text().then(errorMessage => {
        console.error('API error (non-OK status):', error.status, errorMessage);
      }).catch(parseError => {
        // Handle potential errors in parsing the error message itself
        console.error('Error parsing error response:', parseError);
      });
    } else if (error instanceof SyntaxError) {
      // Catch specifically the JSON parsing error
      console.error('Invalid JSON received:', error.message);
    } else if (error instanceof Error) {
        console.error("An unexpected error occurred:", error.message);
    } else {
        console.error("An unknown error occurred:", error);
    }
}finally {
        // if (connection) {
        //     await connection.close();
        // }
    }

  

  res.status(200).json({"message": "register new user"});
});