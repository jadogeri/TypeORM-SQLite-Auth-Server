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
import { loginUpdatedUserTests } from "./controllers/userController/loginUpdatedUserTests";
import { currentUserTests } from "./controllers/userController/currentUserTests";
import { createItemTests } from "./controllers/itemController/createItemTests";
import { getAllItemsTests } from "./controllers/itemController/getAllItemsTests";
import { getSingleItemTests } from "./controllers/itemController/getSingleItemTests";
import { deleteSingleItemTests } from "./controllers/itemController/deleteSingleItemTests";
import { deleteAllItemsTests } from "./controllers/itemController/deleteAllItemsTests";
import { updateItemTests } from "./controllers/itemController/updateItemTests";
import { logoutUserTests } from "./controllers/userController/logoutUserTests";
import { fileRemover } from "../fileRemover";
import { deactivateUserTests } from "./controllers/userController/deactivateUserTests";

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

  registerUserTests();
  loginUserTests();
  forgotUserTests();
  loginUpdatedUserTests();
  currentUserTests();
  createItemTests();
  getAllItemsTests();
  getSingleItemTests();
  updateItemTests()
  deleteSingleItemTests()
  deleteAllItemsTests()
  logoutUserTests()
  deactivateUserTests()

  //   // Verify data in the database
  //   // const createdUser = await getRepository(User).findOne({ where: { email: newUser.email } });
  //   //expect(createdUser).toBeDefined();
  //   //expect(createdUser?.name).toBe(newUser.name);
  // });
});


