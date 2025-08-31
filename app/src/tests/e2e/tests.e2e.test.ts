import * as dotenv from "dotenv"
dotenv.config();
import { LocalStorage } from "node-localstorage";


//changing environment to test
process.env.ENVIRONMENT = "VIRTUAL"

import "reflect-metadata";
import express, { Response, Request } from "express";
import { registerUserTests } from "./controllers/userController/registerUserTests";
import bodyParser from "body-parser";
import cors from "cors"
import { corsOptions } from "../../configs/cors"
import { errorHandler } from "../../middlewares/errorHandler";
import { AppDataSource } from "../../data-source";
import { IncomingMessage, Server, ServerResponse } from "http";
import { loginUserTests } from "./controllers/userController/loginUserTests";
import { forgotUserTests } from "./controllers/userController/forgotUserTests";

let server : Server<typeof IncomingMessage, typeof ServerResponse> ;
let app = express()
const port = 4500/// process.env.PORT || 4500
app.use(express.json());

beforeAll( async () => {

  // start test database instance
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

    // routes
    app.use("/api/users", require("../../routes/userRoutes"));
    app.use("/api/items", require("../../routes/itemRoutes"));

    // middlewares
    app.use(bodyParser.json())
    app.use(cors(corsOptions)) 
    app.use(errorHandler);

    app.get('/', (req: Request, res : Response) => {

      res.send({message:"Welcome to Server API"});
    });
    server =  app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    }) as  Server<typeof IncomingMessage, typeof ServerResponse>;
  })
});

afterAll(()=>{

  //close server instance
  server.close(() => {
  });

  // close database instance
  AppDataSource.destroy()
})



describe('POST /users', () => {

   global.localStorage = new LocalStorage('./src/tests/storage');

  registerUserTests()
  loginUserTests()
  forgotUserTests()
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


