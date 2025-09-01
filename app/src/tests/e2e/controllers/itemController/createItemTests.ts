import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
import { fileWriter } from '../../../fileWriter';

export const createItemTests = () => {
  describe('Create Item Tests', () => {

    test.each([
      ["lambo"], 
      ["maybach"],
      ["porsche"],
      ["ferrari"],
      ["rolls royce"],
      ["aston martin"],
    ])(`Should Add new item (car : %s) to user`, async (car: string) => {
      let userDatabaseAsString = localStorage.getItem("userdatabase") 
      const userDatabase = await JSON.parse(userDatabaseAsString as string);
      const res = await request(BASE_URL)
       .post('/items/')
       .send({name: car}) 
       .set('Authorization', `Bearer ${userDatabase.token}`);
      let itemDatabaseAsString = localStorage.getItem("itemdatabase") 
      const item = await res.body
     if(itemDatabaseAsString){
        let jsonData = await JSON.parse(itemDatabaseAsString);
        jsonData = [...jsonData, res.body];

        localStorage.setItem("itemdatabase", JSON.stringify(jsonData,null, 4)) 
        fileWriter(__dirname + "/../../../__mocks__/items.json" , JSON.stringify(jsonData, null, 4) );

      }else{
        let itemDatabase = [];
        itemDatabase.push(res.body)
        localStorage.setItem("itemdatabase", JSON.stringify(itemDatabase,null, 4)) 
        fileWriter(__dirname + "/../../../__mocks__/items.json" , JSON.stringify(itemDatabase, null, 4) )
      }

      expect(item).toBeDefined();
      expect(item.name).toBe(car);
      expect(item.user).toBeDefined();
      expect(item.id).toBeDefined();
      expect(item.createdAt).toBeDefined();
      expect(item.updatedAt).toBeDefined();

    });

  });
  
};





