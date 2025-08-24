/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 24-AUG-2025
 * @description function toget all items by user in database
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';
import * as itemService from"../../services/itemService"
import * as userService from"../../services/userService"
import { IJwtPayload } from '../../interfaces/IJWTPayload';
import { Item } from '../../entities/Item';
import exceptionHandler from '../../utils/exceptionHandler';
import { errorBroadcaster } from '../../utils/errorBroadcaster';
import { User } from '../../entities/User';


/**
*@desc Get All Items
*@route GET /api/itemss/
*@access private
*/

export const getItem = asyncHandler(async (req : IJwtPayload, res: Response)  =>  {

  const stringId : any =  req.params.id;
  if(!parseInt(stringId)){
    res.status(400);
    throw new Error(`Error: id '${stringId}' is not valid.`);    
  }

  const itemId = parseInt(stringId);

  try{
    console.log("user extracted from jwt token === ",JSON.stringify(req.user,null,3))
    if(req.user){
      const payload = req.user;
      const user : User | null = await userService.getById(payload.id);
      if(!user){
        res.status(400).json("user does not exist");
      }
      const item : Item | null  = await itemService.getByUserId(itemId, user as User) ;
      if(!item){
        res.status(400).json("item does not exist");
      }
      console.log(JSON.stringify(item,null,3))    
      res.status(200).json(item);
    }
    else{
      res.status(400).json({ message: "Invalid User" });
    }
   }catch(error : unknown){
    exceptionHandler(error, errorBroadcaster, res);  
  }

});
