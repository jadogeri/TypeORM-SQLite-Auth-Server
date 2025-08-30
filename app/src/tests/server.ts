
import express, { Response, Request } from "express";
import * as dotenv from "dotenv"
dotenv.config();
// Assign a new environment variable
process.env.ENVIRONMENT = "TEST";

import bodyParser from "body-parser";
import cors from "cors"
import { corsOptions } from "../configs/cors"
import { errorHandler } from "../middlewares/errorHandler";

import { AppDataSource } from "../data-source"

const app = express();
AppDataSource.initialize()
    .then(async () => {
        const port = 4500/// process.env.PORT || 4500
        app.use(express.json());


        app.use(bodyParser.json())


        app.use("/api/users", require("../../src/routes/userRoutes"));
        app.use("/api/items", require("../../src/routes/itemRoutes"));
        app.use(errorHandler);


        app.get('/', (req: Request, res : Response) => {

        // middlewares
        app.use(cors(corsOptions)) 
        res.send({message:"Welcome to Server API"});
        });
            app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => console.log(error));

    const server = ()=>{
        try{

        const port = 4500/// process.env.PORT || 4500
        app.use(express.json());
        app.use(bodyParser.json())

        app.use("/api/users", require("../../src/routes/userRoutes"));
        app.use("/api/items", require("../../src/routes/itemRoutes"));
        app.use(errorHandler);

        app.get('/', (req: Request, res : Response) => {

        // middlewares
        app.use(cors(corsOptions)) 
        res.send({message:"Welcome to Server API"});
        });
            return app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });


    } catch(e : unknown){
        console.log(e)

    }
}

    

    export default server;
    export {app}
    