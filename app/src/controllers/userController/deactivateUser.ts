/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 11-AUG-2025
 *
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';

/**
*@desc deactivate a user
*@route DELETE /api/users/deactivate
*@access private
*/

export const deactivateUser = asyncHandler(async (req : Request, res: Response) => {

  res.status(200).json({"message": "deactivate a user"});
});