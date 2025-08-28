

// myClass.test.ts
import { Auth } from "../../../entities/Auth";
import { User } from "../../../entities/User";


describe('Auth ', () => {

  // Using an array of arrays for the data table
  test.each([
    [
        {
            auth0 :{id:1, token: "token1"},
            user0: { id : 1, username: "john smith", email:"johnsmith@gmail.com",password:"password",phone: "5041234567"}
        },
        {
            auth0 :{id:2, token: "token2"},
            user0: { id : 2, username: "jane smith", email:"janesmith@gmail.com",password:"pass",phone: "6751234567"}
        },
    ],
  ])('create Auth instance with correct values', ({auth0, user0}) => {
    // Arrange
    const user = new User(user0.id, user0.username, user0.email, user0.password, user0.phone);

    // Act
    const auth = new Auth(auth0.id,user,auth0.token);

    // Assert
    expect(auth).toBeDefined();
    expect(auth.id).toBe(1)

  });

});

