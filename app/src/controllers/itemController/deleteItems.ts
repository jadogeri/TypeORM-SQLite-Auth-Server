/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';

/**
*@desc delete an item
*@route DELETE /api/items/delete
*@access private
*/

export const deleteItems = asyncHandler(async (req : Request, res: Response) => {

  res.status(200).json({"message": "delete an item"});
});