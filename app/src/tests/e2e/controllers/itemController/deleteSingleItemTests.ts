import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
import { fileWriter } from '../../../fileWriter';

export const deleteSingleItemTests = () => {
  describe('Delete Single Item Tests', () => {

    test.each([
      ["ferrari", 4],
      ["rolls royce", 5],
      ["aston martin", 6],
    ])(`Should delete item (car : %s) with id %s`, async (car: string, id: number) => {
      let userDatabaseAsString = localStorage.getItem("userdatabase") 
      const userDatabase = await JSON.parse(userDatabaseAsString as string);
      const res = await request(BASE_URL)
       .delete(`/items/${id}`)
       .set('Authorization', `Bearer ${userDatabase.token}`);
      const response = res.body;

      const itemDatabaseAsString = localStorage.getItem("itemdatabase") as string;
      let jsonData = await JSON.parse(itemDatabaseAsString);
      let newjsonData = jsonData.filter((item: any)=>{
        return item.id !== id
      });

      localStorage.setItem("itemdatabase", JSON.stringify(newjsonData,null, 4)) 
      fileWriter(__dirname + "/../../../__mocks__/items.json" , JSON.stringify(newjsonData, null, 4) );
      expect(response).toBeDefined();
      expect(response.message).toMatch(`deleted item id '${id}' `);

    });

  });
  
};





