import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';

export const getAllItemsTests = () => {
  describe('Get All Items Tests', () => {

    test('Should Get All items (cars) successfully', async () => {
      let userDatabaseAsString = localStorage.getItem("userdatabase") 
      const userDatabase = await JSON.parse(userDatabaseAsString as string);
      const res = await request(BASE_URL)
       .get('/items/')
       .set('Authorization', `Bearer ${userDatabase.token}`);
      const items = res.body;
      expect(items).toBeDefined();
      expect(items.length).toBeGreaterThan(0);
      expect(items[0].id).toEqual(1)
      expect(items[0].name).toBe("lambo");
      expect(items[0].createdAt).toBeDefined();
      expect(items[0].updatedAt).toBeDefined();

    },6000);

  });
  
};





