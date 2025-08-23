/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';

/**
*@desc retrieve an item
*@route GET /api/items/retrieve
*@access private
*/

export const getItems = asyncHandler(async (req : Request, res: Response) => {

  res.status(200).json({"message": "retrieve an item"});
});