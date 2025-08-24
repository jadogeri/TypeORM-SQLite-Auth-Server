/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 * @description function to delete all items by user in database
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';
import { IJwtPayload } from '../../interfaces/IJWTPayload';
import * as itemService from"../../services/itemService"
import { Item } from '../../entities/Item';
import exceptionHandler from '../../utils/exceptionHandler';
import { errorBroadcaster } from '../../utils/errorBroadcaster';

/**
*@desc delete an item
*@route DELETE /api/items/delete
*@access private
*/

export const deleteItems = asyncHandler(async (req : IJwtPayload, res: Response) => {

  if(req.user){
    try{
      const items : Item[] = await itemService.getAll(req);
      if(items.length === 0){
        res.status(200).json({ message: `all items of user id : ${req.user.id} already empty` });
      }      
      await itemService.removeAll(req)
      .then(()=>{
        res.status(200).json({ message: `deleted all items of user id : ${req.user.id}` });
      });
    }catch(error: unknown){
      exceptionHandler(error, errorBroadcaster, res) 
    }
  }
  else{
    res.status(400).json({ message: "Invalid User" });
  }

});

