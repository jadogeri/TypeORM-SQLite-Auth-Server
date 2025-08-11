/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';

/**
*@desc forgot a user
*@route POST /api/users/forgot
*@access private
*/

export const forgotUser = asyncHandler(async (req : Request, res: Response) => {

  res.status(200).json({"message": "forgot a user"});
});