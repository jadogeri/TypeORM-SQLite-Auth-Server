

// myClass.test.ts
import { Item } from "../../../entities/Item";
import { User } from "../../../entities/User";

describe('Item ', () => {

 
  // Using an array of arrays for the data table
  test.each([
    [
        {
            item0 :{id:1, name: "name1"},
            user0: { id : 1, username: "john smith", email:"johnsmith@gmail.com",password:"password",phone: "5041234567"}
        },
        {
            item0 :{id:2, name: "name2"},
            user0: { id : 2, username: "jane smith", email:"janesmith@gmail.com",password:"pass",phone: "6751234567"}
        },
    ],
  ])('create Item instance with correct values', ({item0, user0}) => {
    // Arrange
    const user = new User(user0.id, user0.username, user0.email, user0.password, user0.phone);

    // Act
    const item = new Item(item0.id,user,item0.name);

    // Assert
    expect(item).toBeDefined();
    expect(item.id).toBe(1)

  });

});

