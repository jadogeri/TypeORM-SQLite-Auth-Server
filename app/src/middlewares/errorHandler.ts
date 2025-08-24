
/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 24-AUG-2025
 * @description middleware to handle multiple error codes
 */
import { constants } from "../constants";
import { Response, Request,NextFunction } from "express";

export const errorHandler = (err : Error, req : Request, res : Response, next : NextFunction) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log("status code is ", statusCode)
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.CONFLICT:
      res.json({
        title: "Conflict",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.LOCKED_ACCOUNT:
      res.json({
        title: "Locked account",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.INVALID_RECIPIENT:
      res.json({
        title: "Invalie Recipient (email)",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No Error, All good !");
      break;
  }
};

