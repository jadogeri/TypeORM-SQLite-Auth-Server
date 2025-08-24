/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 24-AUG-2025
 * @description function to get all items by user in database
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';
import * as itemService from"../../services/itemService"
import { IJwtPayload } from '../../interfaces/IJWTPayload';
import { Item } from '../../entities/Item';
import exceptionHandler from '../../utils/exceptionHandler';
import { errorBroadcaster } from '../../utils/errorBroadcaster';


/**
*@desc Get All Items
*@route GET /api/itemss/
*@access private
*/

export const getItems = asyncHandler(async (req : IJwtPayload, res: Response)  =>  {

  try{
    if(req.user){
      const items : Item[] = await itemService.getAll(req);
      console.log(JSON.stringify(items,null,3))    
      res.status(200).json(items);
    }
    else{
      res.status(400).json({ message: "Invalid User" });
    }
   }catch(error : unknown){
    exceptionHandler(error, errorBroadcaster, res);  
  }

});

