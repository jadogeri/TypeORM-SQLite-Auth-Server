
import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
import { users as userArray } from '../../../__mocks__/usersList';


export const loginUserTests = () => {
  describe('login User Tests', () => {

    describe('Happy Paths', () => {

      test('should login user successfully', async () => {
        let mockObj = userArray[0]
        console.log("login data ===", mockObj)
        const res = await request(BASE_URL).post('/users/login').send({password: mockObj.password, email : mockObj.email});
                  const {accessToken } = res.body

        if(res.statusCode < 400){

              let data = localStorage.getItem("userdatabase") //fileReader(__dirname + "/../../../__mocks__/registeredUser.json");


        let registeredUser = await JSON.parse(data as string)

        const updatedUser = {...registeredUser , token : accessToken}

        //fileWriter(__dirname + "/../../../__mocks__/updatedUser.json" , JSON.stringify(updatedUser, null, 4) )
        localStorage.setItem("userdatabase",JSON.stringify(updatedUser, null, 4));  

        }
        //load registered user and update with new fields


            
        
        expect(accessToken).toBeDefined();  
 
  
      
      },6000);

      test('should return user credentials with token', async () => {

        const user = userArray[0]
        let stringdata = localStorage.getItem("userdatabase")
        const userdata =  await JSON.parse(stringdata as string)

        const res = await request(BASE_URL).get('/users/current').set('Authorization', `Bearer ${userdata?.token}`)

        expect(res.status).toBe(200);  
        expect(res.body.username).toBe(user.username);
        expect(res.body.email).toBe(user.email);      
      },1000);
    });

  describe('Edge Cases', () => {

    test('should handle invalid password gracefully ', async () => {
      let mockObj = userArray[1]
      const res = await request(BASE_URL).post('/users/login').send({password: mockObj.password, email : mockObj.email});

      //load registered user and update with new fields      
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("email or password is incorrect");    
    
    },10000);

    test('should handle multiple login attempts with invalid password', async () => {
      let mockObj = userArray[1]
      await request(BASE_URL).post('/users/login').send({password: mockObj.password, email : mockObj.email});
      const res =  await request(BASE_URL).post('/users/login').send({password: mockObj.password, email : mockObj.email});

      //load registered user and update with new fields
      
      expect(res.status).toBe(423);
      expect(res.text).toContain("Account is locked beacause of too many failed login attempts. Use forget account to access acount");    
    
    },10000);

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
