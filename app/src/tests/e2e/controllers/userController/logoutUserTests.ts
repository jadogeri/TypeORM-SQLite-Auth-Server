
import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';

export const logoutUserTests = () => {
  describe('Logout User Tests', () => {

    describe('Happy Paths', () => {

      test('should logout user credentials with valid JWT token', async () => {

        let stringdata = localStorage.getItem("userdatabase")
        const userdata =  await JSON.parse(stringdata as string)

        const res = await request(BASE_URL).post('/users/logout').set('Authorization', `Bearer ${userdata.token}`)

        console.log("res after logout****************************************", res)
        expect(res.status).toBe(200);  
        expect(res).toBeDefined();
      },1000);
    });

  })}
