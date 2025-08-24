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
import { IItem } from '../../interfaces/IItem';
import { UpdateResult } from 'typeorm';

/**
*@desc update an item
*@route PUT /api/items/update
*@access private
*/

export const updateItem = asyncHandler(async (req : IJwtPayload, res: Response) => {

  const stringId : any =  req.params.id;
  if(!parseInt(stringId)){
    res.status(400);
    throw new Error(`Error: id '${stringId}' is not valid.`);    
  }

  const itemId = parseInt(stringId);
  const { name } : IItem = req.body;
  if(!name){
    res.status(200).json({"message": "name must be provided"});
  }

    const payload = req.user;
    const user : User | null = await userService.getById(payload.id);
    if(!user){
      res.status(400).json("user does not exist");
    }
    console.log("user in database", JSON.stringify(user, null, 4))
    const item : Item | null  = await itemService.getByUserId(itemId, user as User) ;
    if(!item){
      res.status(400).json("item does not exist");
    }
    const updateResult: UpdateResult = await itemService.update(itemId, req.body)
      if(updateResult.affected === 1){
    res.status(200).json({"message": `updated item id '${itemId}' of user '${user?.username}' `});

  }
  res.status(200).json({"message": name});
});