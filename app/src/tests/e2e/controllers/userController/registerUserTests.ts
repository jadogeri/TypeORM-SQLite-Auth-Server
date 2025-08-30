import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
import { fileReader } from '../../../fileReader';
import { users as userArray } from '../../../__mocks__/usersList';
import { IUser } from '../../../../interfaces/IUser';
export const registerUserTests = () => {
  describe('Register User Tests', () => {

  test('should create a new user', async () => {
    console.log(userArray)
    const newUser = userArray[0]
      const res = await request(BASE_URL).post('/users/register').send(newUser as IUser)    
   //expect(res.body).toHaveProperty('id');
    expect(res.body.failedLogins).toBe(0);
    expect(res.body.email).toBe(newUser.email);


    // Verify data in the database
    // const createdUser = await getRepository(User).findOne({ where: { email: newUser.email } });
    //expect(createdUser).toBeDefined();
    //expect(createdUser?.name).toBe(newUser.name);
  });



      it('should reject duplicate user accounts', async () => {
            const newUser = userArray[0]
      const res = await request(BASE_URL)
      .post('/users/register')
      .send(newUser as IUser)
      const text = JSON.parse(res.text);
      expect(text?.title).toBe("Server Error");
      expect(text?.message).toContain("SQLITE_CONSTRAINT");
      expect(text?.message).toContain("SQLITE_CONSTRAINT");
      expect(res.status).toBe(500);

     //expect(res.status).toThrow(new Error("No Action was provided."));
  });
;


    // test('should handle another scenario in Feature A', () => {
    //   expect(1 + 1).toBe(2);
    // });
  });
};