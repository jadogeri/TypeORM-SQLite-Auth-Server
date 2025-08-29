import request from "supertest"
import { fileReader } from '../../../fileReader';
import { BASE_URL } from '../../../setupTests';
import { IUser } from '../../../../interfaces/IUser';
import app from "../../../server";


export const registerUserTest = () => {

  test('registers user Tesing in isolation', async () => {

    try{

      console.log(__dirname)
      let path  : string = __dirname + "/../../../__mocks__/user.json"
      let initUser = fileReader(path)
      console.log("init user ========================",initUser)
      localStorage.setItem("user",initUser);      

      let mock = localStorage.getItem("user");
      console.log("mock", JSON.stringify(mock, null,4))
      let mockObj = JSON.parse(mock as string)
      console.log("mock obj stringify", JSON.stringify(mockObj, null,4))
            console.log("mock obj regular", mock)

      let mockUser : IUser = {
        username: mockObj?.username as string,
        email: mockObj.email as string,
        password: mockObj?.password as string,
        phone: mockObj.phone as string,

        
      }
      const res = await request(BASE_URL).post('/users/register').send(mockUser)    

      console.log("data retrieved from test == ",JSON.stringify(res, null, 2

      ))
      if(res.statusCode ===201){
        let updatedCreds = {...mockObj,... res.body,password : mockObj.password}   
        localStorage.setItem("user",JSON.stringify(updatedCreds, null, 2))

      }

      expect(res.statusCode).toEqual(200);
    }catch(e){
      console.log(e);
    }    
 
  },30000)


    test('registers user should handle duplicate accounts gracefully', async () => {

    try{

      console.log(__dirname)
      let path  : string = __dirname + "/../../../__mocks__/user.json"
      let initUser = fileReader(path)
      console.log("init user ========================",initUser)
      localStorage.setItem("user",initUser);      

      let mock = localStorage.getItem("user");
      console.log("mock", JSON.stringify(mock, null,4))
      let mockObj = JSON.parse(mock as string)
      console.log("mock obj stringify", JSON.stringify(mockObj, null,4))
            console.log("mock obj regular", mock)

      let mockUser : IUser = {
        username: mockObj?.username as string,
        email: mockObj.email as string,
        password: mockObj?.password as string,
        phone: mockObj.phone as string,

        
      }
      const res = await request(BASE_URL).post('/users/register').send(mockUser)    

      console.log("data retrieved from test == ",JSON.stringify(res, null, 2

      ))
      // if(res.statusCode ===201){
      //   let updatedCreds = {...mockObj,... res.body,password : mockObj.password}   
      //   localStorage.setItem("user",JSON.stringify(updatedCreds, null, 2))

      // }

      expect(res.statusCode).toEqual(500);
    }catch(e){
      console.log(e);
    }    
 
  },30000)


  
}


















