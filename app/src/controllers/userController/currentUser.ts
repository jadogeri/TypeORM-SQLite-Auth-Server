/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';

/**
*@desc Current user info
*@route GET /api/users/current
*@access private
*/

export const currentUser = asyncHandler(async (req : Request, res: Response) => {

  res.status(200).json({"message": "get current user"});
});