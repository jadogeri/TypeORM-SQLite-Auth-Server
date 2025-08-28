
import express, { Response, Request } from "express";
import * as dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors"
import { errorHandler } from '../middlewares/errorHandler';
import { AppDataSource } from './TestDataSource';
import { corsOptions } from '../configs/cors';


const app = express();

const port = 4500;



  dotenv.config();
  


          // This is a class function (method)
    AppDataSource.initialize()
            .then(async () => {

app.use(express.json());
//app.use("/api/contacts", require("./src/routes/contactRoutes"))

app.use("/api/users", require("../../src/routes/userRoutes"));
app.use("/api/items", require("../../src/routes/itemRoutes"));
app.use(errorHandler);


app.get('/', (req: Request, res : Response) => {

// middlewares
app.use(cors(corsOptions)) 
res.send({message:"Welcome to Server API"});
});
app.use(errorHandler);
app.use(cors(corsOptions)) 
        
        
                app.use(bodyParser.json())
        
        

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
            .catch((error: unknown) => {console.log(error)});
            
