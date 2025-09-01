
import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
import { fileWriter } from '../../../fileWriter';

export const forgotUserTests = () => {

    describe('Reset User Tests', () => {

        describe('Happy Paths', () => {

            test('reset user password', async () => {

                let initUser = localStorage.getItem("userdatabase"); 
                
                let user = JSON.parse(initUser as string)

                const {email, old_password, new_password} = user

                const res = await request(BASE_URL).post(`/users/reset`)
                        .send({email : email, old_password : old_password, new_password: new_password});
                const {password} = res.body
                user = {...user, password : user.new_password, old_password: ""};
                localStorage.setItem("userdatabase", JSON.stringify(user, null , 2))
                fileWriter(__dirname + "/../../../__mocks__/user.json" , JSON.stringify(user, null, 4) )
                
                expect(res.statusCode).toEqual(200);
                expect(res.body.password).toBe(user.new_password);
                expect(res.body).toBeDefined();
                expect(password).toBeDefined()

            },6000)

        });
    })
}

