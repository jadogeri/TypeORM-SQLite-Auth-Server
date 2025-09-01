/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 24-AUG-2025
 * @description function to logout user;
 */

const asyncHandler = require("express-async-handler");
import { Response, Request } from 'express';
import { IUserAuthorized } from '../../interfaces/IUserAuthorized';
import { errorBroadcaster } from "../../utils/errorBroadcaster";
import * as authService from "../../services/authService"
import exceptionHandler from '../../utils/exceptionHandler';

/**
*@desc Logout a user
*@route POST /api/users/logout
*@access public
*/

export const logoutUser = asyncHandler(async (req: Request, res : Response) => {
   
  const {token} :IUserAuthorized = await req.body
  try{
    if(!token){ 
      errorBroadcaster(res,400,"field token is mandatory");
    } 
    const authenticatedUser = await authService.getByToken(token as string)
    if(!authenticatedUser){
      res.status(401).json({ message: "Already logged out" });
    }
    //remove auth from Auth Collection
    
    await authService.remove(authenticatedUser?.id as number)
  
    res.status(200).json({ message: "logout the user" });
  }catch(error : unknown){
    exceptionHandler(error, errorBroadcaster, res);  
  }
});


