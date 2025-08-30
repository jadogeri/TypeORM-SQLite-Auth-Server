import { Response } from "express";
import { QueryFailedError } from "typeorm";

const exceptionHandler = (error: unknown,errorBroadcaster: Function, res : Response) => {
   if (error instanceof QueryFailedError) {
      console.error("Database query failed:", error.message);
      // You can further inspect error.driverError for SQLite-specific details if available
      // For example, SQLite unique constraint violation might have a specific code or message
      if (error.message.includes("SQLITE_CONSTRAINT")) {
          //console.error("Unique constraint violation detected.");
          // console.log("error.name :", error.name);
          // console.log("error.cause : " , error.cause);
          // console.log("error.stack : ", error.stack);
          // console.log("error : ", error.driverError);
          // console.log("error.message : ", error.message)
          errorBroadcaster(res, 500, error.message);
          //res.status(500).json({"message": error.message})
      }      
    }else if (error instanceof Response) {
      // If the error is a Response object (from `throw response` above)
      error.text().then(errorMessage => {
        console.error('API error (non-OK status):', error.status, errorMessage);
      }).catch(parseError => {
        // Handle potential errors in parsing the error message itself
        console.error('Error parsing error response:', parseError);
      });
    } else if (error instanceof SyntaxError) {
      // Catch specifically the JSON parsing error
      console.error('Invalid JSON received:', error.message);
      errorBroadcaster(res, 500, error.message);

    } else if (error instanceof Error) {
        console.error("An unexpected error occurred:", error.message);
        errorBroadcaster(res, 500, error.message);
        
    } else {      
        console.error("An unknown error occurred:", error);
                errorBroadcaster(res, 500, error);

    }

}

export default exceptionHandler