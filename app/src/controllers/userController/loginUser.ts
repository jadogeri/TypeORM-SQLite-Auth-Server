/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';

/**
*@desc login a user
*@route POST /api/users/login
*@access private
*/

export const loginUser = asyncHandler(async (req : Request, res: Response) => {

  res.status(200).json({"message": "login a user"});
});