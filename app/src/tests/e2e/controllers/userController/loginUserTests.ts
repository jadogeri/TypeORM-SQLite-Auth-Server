
import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
import { users as userArray } from '../../../__mocks__/usersList';
import { IUser } from '../../../../interfaces/IUser';


export const loginUserTests = () => {
  describe('login User Tests', () => {
    test('should login user successfully', async () => {
        let mockObj = userArray[0]
        console.log("user to auth.......................", mockObj)
        const res = await request(BASE_URL).post('/users/login').send({password: mockObj.password, email : mockObj.email});

        console.log("data retrieved from test == ",JSON.stringify(res.body), typeof res.body)
        const {accessToken : token} = res.body
        expect(token).toBeDefined();

    
    
    },6000)
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

    */

  });
};















