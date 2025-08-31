
import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
import { users as userArray } from '../../../__mocks__/usersList';
import { fileWriter } from '../../../fileWriter';
import { fileReader } from '../../../fileReader';


export const forgotUserTests = () => {
  describe('login User Tests', () => {

    describe('Happy Paths', () => {

  test('should generate new password', async () => {

      let initUser = localStorage.getItem("userdatabase"); 
      
      console.log("data with my email", initUser)

      const user = JSON.parse(initUser as string)

      const { email} = user

      const res = await request(BASE_URL).post(`/users/forgot`).send({email : email});

      console.log("data retrieved from test == ",JSON.stringify(res.body), typeof res.body)
      const {password} = res.body
      let updatedUser = {...user, password : password, old_password : password }
      localStorage.setItem("userdatabase", JSON.stringify(updatedUser, null , 2))
      fileWriter(__dirname + "/../../../__mocks__/updatedUser.json" , JSON.stringify(updatedUser, null, 4) )


      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(password).toBeDefined()

},6000)

    });


/*
  
    test('should reject duplicate email user accounts grafecully', async () => {
      const newUser = userArray[1]
      const res = await request(BASE_URL)
      .post('/users/register')
      .send(newUser as IUser)
      const text = JSON.parse(res.text);
      expect(text?.title).toBe("Server Error");
      expect(text?.message).toContain("SQLITE_CONSTRAINT");
      expect(text?.message).toContain(" UNIQUE constraint failed: user.email");
      expect(res.status).toBe(500);
    });



    test('should reject duplicate username user accounts grafecully', async () => {
      const newUser = userArray[2]
      const res = await request(BASE_URL)
      .post('/users/register')
      .send(newUser as IUser)
      const text = JSON.parse(res.text);
      console.log("text...........................................", text)
      expect(text?.title).toBe("Server Error");
      expect(text?.message).toContain("SQLITE_CONSTRAINT");
      expect(text?.message).toContain("UNIQUE constraint failed: user.username");
      expect(res.status).toBe(500);
    });


  }, );
};


*/















  })}




/**
 * 
 import {  test } from '@jest/globals';
const request = require('supertest');
const {BASE_URL}  = require("../constants")


export const forgotUserTest = () => {

  test('forgot user password of contact', async () => {
    try{

      let initUser = localStorage.getItem("user");       

      const user = JSON.parse(initUser as string)

      //get token from user

      const {token, email} = user

      const res = await request(BASE_URL).post(`/api/users/forgot`).send({email : email}).set('Authorization', `Bearer ${token}`)  

      console.log("data retrieved from test == ",JSON.stringify(res.body), typeof res.body)
      const {password} = res.body
      let updatedUser = {...user, password : password, old_password : password }
      localStorage.setItem("user", JSON.stringify(updatedUser, null , 2))

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
    }catch(e){
      console.log(e);
    }
 
  },60000)
   */