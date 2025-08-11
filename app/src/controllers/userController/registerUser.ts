/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';

/**
*@desc resgiter new user
*@route POST /api/users/register
*@access private
*/

export const registerUser = asyncHandler(async (req : Request, res: Response) => {

  res.status(200).json({"message": "register new user"});
});