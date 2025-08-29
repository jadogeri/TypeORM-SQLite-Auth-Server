import express from "express"
import { errorHandler } from "../middlewares/errorHandler";
import { corsOptions } from "../configs/cors";
import cors from "cors"
const { bodyParser} = require("body-parser");
import { IncomingMessage, Server, ServerResponse } from "http";

export class TestServer{


    private app = express();
    private port : number;
    private server : Server<typeof IncomingMessage, typeof ServerResponse> | null;
    constructor(port: number){
        
        this.port = port;
        this.server = null;
        this.initializeConfig()
    }

    setInstance(server : Server<typeof IncomingMessage, typeof ServerResponse>){
        this.server = server
    }

    getInstance() : Server<typeof IncomingMessage, typeof ServerResponse>{
       return this.server as Server<typeof IncomingMessage, typeof ServerResponse>;
    }

    initializeConfig(){
         this.app.use(express.json())

        //middlewares
        //this.app.use(errorHandler);
        //this.app.use(cors(corsOptions)) 
        //this.app.use(bodyParser.json())

        //routes        
        this.app.use("/api/users", require("../../src/routes/userRoutes"));
        this.app.use("/api/items", require("../../src/routes/itemRoutes"));
        
    }

    start(){
        let server = this.app.listen(this.port, () => {
                    console.log(`Server running on port ${this.port}`);
        });
        this.setInstance(server);

    }

}


        

        
        
