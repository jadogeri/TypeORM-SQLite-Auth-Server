// import { LocalStorage } from "node-localstorage";
// import * as db from "../../MongoMemoryServer"
// import { registerUserTest } from "./registerUserTest";
// import { loginUserTest } from "./loginUserTest";
// import { currentUserTest } from "./currentUserTest";
// import { logoutUserTest } from "./logoutUserTest";
// import { forgotUserTest } from "./forgotUserTest";
// import { resetUserTest } from "./resetUserTest";
// import {deactivateUserTest } from "./deactivateUserTest";
import { registerUserTest } from "./registerUserTest";

describe('testing user and contact api requests', () => {

    
  beforeAll(async () => {
    
    //await testDB.start()
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