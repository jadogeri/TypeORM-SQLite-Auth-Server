import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';

export const getAllItemsTests = () => {
  describe('Get All Items Tests', () => {

    test('Should Add new item (car) to user', async () => {
      let userDatabaseAsString = localStorage.getItem("userdatabase") 
      const userDatabase = await JSON.parse(userDatabaseAsString as string);
      const res = await request(BASE_URL)
       .get('/items/')
       .set('Authorization', `Bearer ${userDatabase.token}`);
      console.log("response data jason", res.body);
      const items = res.body;

      expect(items).toBeDefined();
      expect(items.length).toBeGreaterThan(0);
      expect(items[0].user).toBeDefined()

    });

  });
  
};





