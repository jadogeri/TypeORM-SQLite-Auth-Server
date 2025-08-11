/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';

/**
*@desc logout a user
*@route POST /api/users/logout
*@access private
*/

export const logoutUser = asyncHandler(async (req : Request, res: Response) => {

  res.status(200).json({"message": "logout a user"});
});