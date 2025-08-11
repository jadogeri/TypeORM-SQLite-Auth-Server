/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';

/**
*@desc reset a user
*@route PUT /api/users/reset
*@access private
*/

export const resetUser = asyncHandler(async (req : Request, res: Response) => {

  res.status(200).json({"message": "reset a user"});
});