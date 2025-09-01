
import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
import { users as userArray } from '../../../__mocks__/usersList';

export const currentUserTests = () => {
  describe('current User Tests', () => {

    describe('Happy Paths', () => {

      test('should return user credentials with updated token', async () => {

        const user = userArray[0]
        let stringdata = localStorage.getItem("userdatabase")
        const userdata =  await JSON.parse(stringdata as string)

        const res = await request(BASE_URL).get('/users/current').set('Authorization', `Bearer ${userdata?.token}`)

        expect(res.status).toBe(200);  
        expect(res.body.username).toBe(user.username);
        expect(res.body.email).toBe(user.email);      
      },1000);
    });

  })}
