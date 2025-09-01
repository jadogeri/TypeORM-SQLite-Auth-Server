import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
export const updateItemTests = () => {

  describe('Update Single Item Tests', () => {
    test.each([
      ["benz", 1],
      ["ford", 2],
      ["gmc", 3],
    ])(`Should update item (car : %s) with id %s`, async (car: string, id: number) => {
      let userDatabaseAsString = localStorage.getItem("userdatabase") 
      const userDatabase = await JSON.parse(userDatabaseAsString as string);
      const res = await request(BASE_URL)
       .put(`/items/${id}`)
       .send({name: car})
       .set('Authorization', `Bearer ${userDatabase.token}`);
      const response = res.body;

      expect(response).toBeDefined();
      expect(response.message).toBeDefined();
      expect(response.message).toMatch(`updated item id '${id}' of user '${userDatabase.username}' `);

    },6000);

  });
  
};





