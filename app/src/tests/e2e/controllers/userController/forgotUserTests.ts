
import {  test, describe,  expect } from '@jest/globals';
import request from 'supertest';
import { BASE_URL } from '../../../setupTests';
import { fileWriter } from '../../../fileWriter';

export const forgotUserTests = () => {

    describe('login User Tests', () => {

        describe('Happy Paths', () => {

            test('should generate new password', async () => {

                let initUser = localStorage.getItem("userdatabase"); 
                
                console.log("data with my email", initUser)

                const user = JSON.parse(initUser as string)

                const { email} = user

                const res = await request(BASE_URL).post(`/users/forgot`).send({email : email});

                console.log("data retrieved from test == ",JSON.stringify(res.body), typeof res.body)
                const {password} = res.body
                let updatedUser = {...user, password : password, old_password : password, new_password:"Test12345@" }
                localStorage.setItem("userdatabase", JSON.stringify(updatedUser, null , 2))
                fileWriter(__dirname + "/../../../__mocks__/user.json" , JSON.stringify(updatedUser, null, 4) )


                expect(res.statusCode).toEqual(200);
                expect(res.body).toBeDefined();
                expect(password).toBeDefined()

            },6000)

        });
    })
}

