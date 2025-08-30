import * as dotenv from "dotenv"
dotenv.config();

process.env.ENVIRONMENT = "TEST"

import "reflect-metadata";

import request from 'supertest';
import express, { Response, Request } from "express";
//import { featureATests } from "./featureA";
import { registerUserTests } from "./e2e/controllers/userController/registerUserTests";


// Assign a new environment variable
import bodyParser from "body-parser";
import cors from "cors"
import { corsOptions } from "../configs/cors"
import { errorHandler } from "../middlewares/errorHandler";
import { BASE_URL } from './setupTests';
import { AppDataSource } from "../data-source";
import { IncomingMessage, Server, ServerResponse } from "http";
import { IUser } from "../interfaces/IUser";

let server : Server<typeof IncomingMessage, typeof ServerResponse> ;
let app = express()
        const port = 4500/// process.env.PORT || 4500
        app.use(express.json());



beforeAll( async () => {

async function startApp() {
    try {
        await AppDataSource.initialize();
        console.log("Connected to the database!");
        // Now you can perform database operations
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

        await startApp().then(()=>{
      app.use(bodyParser.json())


        app.use("/api/users", require("../routes/userRoutes"));
        app.use("/api/items", require("../routes/itemRoutes"));
        app.use(errorHandler);


        app.get('/', (req: Request, res : Response) => {

        // middlewares
        app.use(cors(corsOptions)) 
        res.send({message:"Welcome to Server API"});
        });
         server =    app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        }) as  Server<typeof IncomingMessage, typeof ServerResponse>;


        })
});

afterAll(()=>{
      server.close(() => {
      //console.log('Express app closed.');
      // Optionally, exit the Node.js process after the server closes
    });

  AppDataSource.destroy()
})



describe('POST /users', () => {
  registerUserTests()
  // test('should create a new user', async () => {
  //   const newUser  : IUser=    {
  //       username : "John1D0e",
  //       email :  "BruceWayne@gmail.com",
  //       password : "b@tMob1LeG0th",
  //       phone : "12345678901"

  //   };
  //     const res = await request(BASE_URL).post('/users/register').send(newUser)    
  //  //expect(res.body).toHaveProperty('id');
  //   expect(res.body.failedLogins).toBe(0);
  //   expect(res.body.email).toBe(newUser.email);

  //   // const response = await request(app)
  
  //   //   .post('/users/register')
  //   //   .send(newUser)
  //   //   //.expect(201);
  //   //   console.log(response.body)

  //   // expect(response.body).toHaveProperty('id');
  //   // expect(response.body.failedLogins).toBe(0);
  //   // expect(response.body.email).toBe(newUser.email);

  //   // Verify data in the database
  //   // const createdUser = await getRepository(User).findOne({ where: { email: newUser.email } });
  //   //expect(createdUser).toBeDefined();
  //   //expect(createdUser?.name).toBe(newUser.name);
  // });
});