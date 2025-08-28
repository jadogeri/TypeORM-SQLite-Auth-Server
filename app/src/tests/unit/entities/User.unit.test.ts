

// User.unit.test.ts
import { User } from "../../../entities/User";


describe('User ', () => {

  // Using an array of arrays for the data table
  test.each([
    [
      {
        user0: { id : 1, username: "john smith", email:"johnsmith@gmail.com",password:"password",phone: "5041234567"}
      },
      {
        user0: { id : 2, username: "jane smith", email:"janesmith@gmail.com",password:"pass",phone: "6751234567"}
      },
    ],
  ])('create Item instance with correct values', ({ user0}) => {
    // Arrange
    let user : User | null;

    // Act
    user = new User(user0.id, user0.username, user0.email, user0.password, user0.phone);

    // Assert
    expect(user).toBeDefined();
    expect(user.id).toBe(1);
    expect(user.failedLogins).toBe(0);


  });

});

