import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';

export const getSingleItemTests = () => {
  describe('Get Single Item Tests', () => {

    test('Should get single item (car) successfully', async () => {
      let userDatabaseAsString = localStorage.getItem("userdatabase") 
      const userDatabase = await JSON.parse(userDatabaseAsString as string);
      const res = await request(BASE_URL)
       .get('/items/1')
       .set('Authorization', `Bearer ${userDatabase.token}`);
      const item = res.body;
      expect(item).toBeDefined();
      expect(item.id).toEqual(1)
      expect(item.name).toBe("lambo");
      expect(item.createdAt).toBeDefined();
      expect(item.updatedAt).toBeDefined();

    },6000);

  });
  
};





