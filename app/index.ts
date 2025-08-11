
import { AppDataSource } from "./src/data-source";
import express, { Response, Request } from "express";
import * as dotenv from "dotenv"
import bodyParser from "body-parser";
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') }); // Adjust path as needed

//dotenv.config();


AppDataSource.initialize()
    .then(async () => {
        const app = express();
        app.use(express.json());

        app.use(bodyParser.json())
        app.get('/', (req: Request, res : Response) => {
        res.send({message:"Welcome to Server API"});
        });
            app.listen(3500, () => {
            console.log("Server running on port 3500");
        });
    })
    .catch((error) => console.log(error));
    