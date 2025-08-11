/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';

/**
*@desc update an item
*@route PUT /api/items/update
*@access private
*/

export const updateItem = asyncHandler(async (req : Request, res: Response) => {

  res.status(200).json({"message": "update an item"});
});