/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';

/**
*@desc add an item
*@route POST /api/items/add
*@access private
*/

export const addItem = asyncHandler(async (req : Request, res: Response) => {

  res.status(200).json({"message": "add an item"});
});