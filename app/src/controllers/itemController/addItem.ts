/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

const asyncHandler = require("express-async-handler");
import { Response, Request } from 'express';
import { IItem } from '../../interfaces/IItem';
import * as ItemService from  "../../services/itemService"
import { IItemCreateRequest } from "../../interfaces/IItemCreateRequest";
import { errorBroadcaster } from '../../utils/errorBroadcaster';


/**
*@desc Add Auth Token
*@route POST /api/Item/create
*@access public
*/

export const addItem = asyncHandler(async (req: IItemCreateRequest, res : Response)  => {

  const { name } = req.body;
if(req){
  console.log("user data === ",name)

 if (!name ) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  else{
    //create new Item user
    
    const Item : IItem = {
      name: name,
      user:  req?.user  as any
    }

    //check database if email is already taken
    await ItemService.create(Item)
    .then((newItem : IItem)=>{
      console.log("new Item : ",newItem,typeof newItem)

      res.status(201).json(newItem);
    })   
    .catch((e: any)=>{
      errorBroadcaster(res,400,`Error:\n ${e}`)

    }) 
  }

}


});




