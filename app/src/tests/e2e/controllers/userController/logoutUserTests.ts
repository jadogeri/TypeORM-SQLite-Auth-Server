
import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
import { fileWriter } from '../../../fileWriter';

export const logoutUserTests = () => {
  describe('Logout User Tests', () => {

      test('should logout user credentials with valid JWT token', async () => {

        let stringdata = localStorage.getItem("userdatabase")
        const userdata =  await JSON.parse(stringdata as string)
        const {token} = await userdata

        const res = await request(BASE_URL).post('/users/logout')
          .send({token: token})

        userdata.token = null

        fileWriter(__dirname + "/../../../__mocks__/user.json" , JSON.stringify(userdata, null, 4) )
        localStorage.setItem("userdatabase",JSON.stringify(userdata, null, 4));  

        expect(res.status).toBe(200);  
        expect(res).toBeDefined();
        expect(res.body.message).toBeDefined();
        expect(res.body.message).toMatch('logout the user');


      },6000);

  })}


