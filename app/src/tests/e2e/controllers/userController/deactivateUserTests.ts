
import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
import { fileRemover } from '../../../fileRemover';

export const deactivateUserTests = () => {
  describe('Deactivate User account Tests', () => {

      test('should deactivate a user account', async () => {

        let stringdata = localStorage.getItem("userdatabase")
        const userdata =  await JSON.parse(stringdata as string)
        const res = await request(BASE_URL).delete('/users/deactivate')
          .send({email: userdata.email, password: userdata.password, confirm:true});

        localStorage.clear()
        fileRemover(__dirname + "/../../__mocks__/user.json" );
        expect(res.status).toBe(200);  
        expect(res).toBeDefined();
        expect(res.body.message).toBeDefined();
        expect(res.body.message).toMatch(`deactivated acoount with email ${userdata.email}`);

      },6000);

  })}


