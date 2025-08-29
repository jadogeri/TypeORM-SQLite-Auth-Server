// import { LocalStorage } from "node-localstorage";
// import * as db from "../../MongoMemoryServer"
// import { registerUserTest } from "./registerUserTest";
// import { loginUserTest } from "./loginUserTest";
// import { currentUserTest } from "./currentUserTest";
// import { logoutUserTest } from "./logoutUserTest";
// import { forgotUserTest } from "./forgotUserTest";
// import { resetUserTest } from "./resetUserTest";
// import {deactivateUserTest } from "./deactivateUserTest";
import { log } from "console";
import server from "../../../server";
import process from "process";

import { registerUserTest } from "./registerUserTest";
    console.log("environment =========", process.env.ENVIRONMENT)

let testServer: any ;
describe('testing user and contact api requests', () => {

    
  beforeAll(async () => {
    testServer = server()

  });

  beforeEach(async () => {
    
    //await createTestConnection()
  });
  afterEach(async () => {
    //await db.clearDatabase()
  });
  afterAll(async () => {
    //await testDB.stop();
    // await db.clearDatabase()
     //await closeTestConnection(connection as Connection)


     // To close the server programmatically
// This will stop the server from accepting new connections,
// but existing connections will be allowed to complete.
testServer.close(() => {
  log('Server closed successfully.');
  process.exit(0); 

});


  });

    //global.localStorage = new LocalStorage('./tests/storage');
    registerUserTest();
    // loginUserTest();
    // currentUserTest()
    // forgotUserTest()
    // resetUserTest()
    // logoutUserTest()
    // deactivateUserTest()    

  
});


/**
 * 
 * 
 


import * as userService from '../../../src/services/userService';
import * as db from "../../MongoMemoryServer"
import User from '../../../src/models/userModel'; // Your User model
import { IUser } from '../../../src/interfaces/IUser';
import { validateStringEquality, validateNotEmpty } from '../../validators';
import { log } from 'console';
import mongoose from 'mongoose';
const users = require("../../__mocks__/users")


describe('userService', () => {

  beforeAll(async () => {
    
    await db.connect()
  });

  // beforeEach(async () => {
    
  //   await db.connect()
  // });
  afterEach(async () => {
    await db.clearDatabase()
  });
  afterAll(async () => {
    await db.closeDatabase()
  });




 */