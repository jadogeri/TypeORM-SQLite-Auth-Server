
import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
import { fileWriter } from '../../../fileWriter';
import { fileReader } from '../../../fileReader';


export const loginUpdatedUserTests = () => {
  describe('login updated User Tests', () => {

    describe('Happy Paths', () => {

      test('should login user with updated credentials successfully', async () => {
        let data = localStorage.getItem("userdatabase")
        console.log("data from file reader", data)
        const mockObj = await JSON.parse(data as string)
        const res = await request(BASE_URL).post('/users/login').send({password: mockObj.password, email : mockObj.email});
        const {accessToken } = await res.body

        if(res.statusCode < 400){

          let data = localStorage.getItem("userdatabase")
          let registeredUser = await JSON.parse(data as string)

          const updatedUser = {...registeredUser , token : accessToken}

          fileWriter(__dirname + "/../../../__mocks__/user.json" , JSON.stringify(updatedUser, null, 4) )
          localStorage.setItem("userdatabase",JSON.stringify(updatedUser, null, 4));  

        }          
        
        expect(accessToken).toBeDefined();  
        expect(res.statusCode).toBe(200);    
      
      },6000);


    });

  })}
