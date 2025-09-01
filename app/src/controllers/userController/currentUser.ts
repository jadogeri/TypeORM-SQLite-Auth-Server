/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 24-AUG-2025
 * @description function to retrieve user details using token
 */

const asyncHandler = require("express-async-handler");
import { Response } from 'express';
import { IJwtPayload } from '../../interfaces/IJWTPayload';

/**
*@desc Current user info
*@route POST /api/users/current
*@access public
*/

export const currentUser = asyncHandler(async (req : IJwtPayload, res: Response) => {

  res.status(200).json(req.user);
});