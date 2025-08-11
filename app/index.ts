
import { AppDataSource } from "./src/data-source";
import express, { Response, Request } from "express";
import * as dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors"
import { corsOptions } from "./src/configs/cors"
import { errorHandler } from "./src/middlewares/errorHandler";

dotenv.config();


AppDataSource.initialize()
    .then(async () => {
        const port = process.env.PORT || 3500
        const app = express();
        app.use(express.json());


        app.use(bodyParser.json())


        app.use("/api/users", require("./src/routes/userRoutes"));
        app.use("/api/items", require("./src/routes/itemRoutes"));
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
    