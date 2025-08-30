/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 24-AUG-2025
 * @description middleware to validate JWT 
 */
import { Response, NextFunction } from "express";
import {jwtDecode} from 'jwt-decode';
const asyncHandler = require("express-async-handler");
import * as jwt from"jsonwebtoken";
import { IJwtPayload } from "../interfaces/IJWTPayload";
import isJwtTokenExpired, { decode } from 'jwt-check-expiry';
import exceptionHandler from "../utils/exceptionHandler";
import { errorBroadcaster } from "../utils/errorBroadcaster";


const validateToken = asyncHandler(async (req : IJwtPayload, res: Response, next: NextFunction) => {

  try{
    let token;
    let authHeader = req.headers.authorization as string;
    console.log("authheader = ", authHeader)
  
    if (!authHeader || !authHeader.startsWith("Bearer")|| !authHeader.split(" ")[1].trim()) {
      res.status(401).json("User not authorized or token missing");
    }
    else{
      token = authHeader.split(" ")[1];  
      console.log('isExpired is:', isJwtTokenExpired(token));
      if(isJwtTokenExpired(token)){
        console.error("token has expired")
        res.status(401).json("token has expired");
      }

      const decoded =  jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET as jwt.Secret)
    
      console.log("decoded = ", decoded)
      console.log('Decoded token :', decode(token));
      const decodedPayload =  jwtDecode<IJwtPayload>(token);
      const {user}  = decodedPayload
      if(decoded ){
        req.user = user
        next();    
      }else{
        res.status(401);
        throw new Error("User not authorized!");
      }
    }
  }catch(e: unknown){
    exceptionHandler(e, errorBroadcaster, res);
  }
});

module.exports = validateToken;

export {validateToken}

