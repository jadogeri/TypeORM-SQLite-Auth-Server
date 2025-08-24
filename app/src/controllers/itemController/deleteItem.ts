/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';
import { IJwtPayload } from '../../interfaces/IJWTPayload';
import { Item } from '../../entities/Item';
import * as itemService from"../../services/itemService"
import * as userService from"../../services/userService"
import exceptionHandler from '../../utils/exceptionHandler';
import { errorBroadcaster } from '../../utils/errorBroadcaster';
import { User } from '../../entities/User';

/**
*@desc delete an item
*@route DELETE /api/items/delete
*@access private
*/

export const deleteItem = asyncHandler(async (req : IJwtPayload, res: Response) => {

  const stringId : any =  req.params.id;
  if(!parseInt(stringId)){
    res.status(400);
    throw new Error(`Error: id '${stringId}' is not valid.`);    
  }

  const itemId = parseInt(stringId);

  let user: User | null= null;
    if(req.user){
      user = req.user as User;
    }
   const item : Item | null  = await itemService.getByUserId(itemId, user as User) ;
    if(!item){
      res.status(400).json("item does not exist");
    }
  
  const deleteResult = await itemService.deleteByUserId(itemId, req)
  if(deleteResult.affected === 1){
    res.status(200).json({"message": `deleted item id '${itemId}' of user '${user?.username}' `});

  }
});

