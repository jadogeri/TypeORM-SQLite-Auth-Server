import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
import { fileWriter } from '../../../fileWriter';

export const deleteAllItemsTests = () => {
  describe('Delete All Items Tests', () => {

    test('Should Delete All items (cars) successfully', async () => {
      let userDatabaseAsString = localStorage.getItem("userdatabase") 
      const userDatabase = await JSON.parse(userDatabaseAsString as string);
      const res = await request(BASE_URL)
       .delete('/items/')
       .set('Authorization', `Bearer ${userDatabase.token}`);
      const response = res.body;

      localStorage.setItem("itemdatabase", JSON.stringify([],null, 4)) 
      fileWriter(__dirname + "/../../../__mocks__/items.json" , JSON.stringify([], null, 4) );
      expect(response).toBeDefined();
      expect(response.message).toMatch(`deleted all items of user id : ${userDatabase.id}`);

    });

  });
  
};





