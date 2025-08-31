import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
import { users as userArray } from '../../../__mocks__/usersList';
import { IUser } from '../../../../interfaces/IUser';
import { fileWriter } from '../../../fileWriter';

export const registerUserTests = () => {
  describe('Register User Tests', () => {

    test('should create a new user', async () => {
      const newUser = userArray[0]
      const res = await request(BASE_URL).post('/users/register').send(newUser as IUser)   
      //add new json file to __mocks__ directory
      if(!res.error)
      fileWriter(__dirname + "/../../../__mocks__/registeredUser.json" , JSON.stringify(res.body, null, 4) )
      localStorage.setItem("userdatabase",JSON.stringify(res.body, null, 4));  

      //expect(res.body).toHaveProperty('id');
      expect(res.body.failedLogins).toBe(0);
      expect(res.body.email).toBe(newUser.email);


      // Verify data in the database
      // const createdUser = await getRepository(User).findOne({ where: { email: newUser.email } });
      //expect(createdUser).toBeDefined();
      //expect(createdUser?.name).toBe(newUser.name);
    },6000);

  
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
    },6000);



    test('should reject duplicate username user accounts grafecully', async () => {
      const newUser = userArray[2]
      const res = await request(BASE_URL)
      .post('/users/register')
      .send(newUser as IUser)
      const text = JSON.parse(res.text);
      expect(text?.title).toBe("Server Error");
      expect(text?.message).toContain("SQLITE_CONSTRAINT");
      expect(text?.message).toContain("UNIQUE constraint failed: user.username");
      expect(res.status).toBe(500);
    },6000);

  });

    test('should login user successfully', async () => {
        let mockObj = userArray[0]
        console.log("login data ===", mockObj)
        const res = await request(BASE_URL).post('/users/login').send({password: mockObj.password, email : mockObj.email});
                  const {accessToken : token} = res.body

        if(res.statusCode < 400){

              let data = localStorage.getItem("userdatabase") //fileReader(__dirname + "/../../../__mocks__/registeredUser.json");


        let registeredUser = await JSON.parse(data as string)

        const updatedUser = {...registeredUser , token : token}

        //fileWriter(__dirname + "/../../../__mocks__/updatedUser.json" , JSON.stringify(updatedUser, null, 4) )
        localStorage.setItem("userdatabase",JSON.stringify(updatedUser, null, 4));  

        }
        //load registered user and update with new fields           
        
        expect(token).toBeDefined();  
   
      
      },6000);
};





