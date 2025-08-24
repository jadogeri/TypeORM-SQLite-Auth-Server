import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { IUser } from "../interfaces/IUser";

const userRepository = AppDataSource.getRepository(User);

/**
 * Creates a new user in the database.
 * @param user - An object implementing the IUser interface representing the user to be created.
 * @returns A promise that resolves to the created user object.
 * @throws Throws an error if the user creation fails due to validation or database issues.
 */
async function create(user : IUser) {
  const createdUser =  userRepository.create(user);  
  await userRepository.save(createdUser);
  return createdUser;
}

/**
 * Retrieves a user from the database by their email address.
 * @param email - The email address of the user to find.
 * @returns A promise that resolves to the user object or null if not found.
 * @throws Throws an error if the database query fails.
 */
async function getByEmail(email : string) {
  const user : User | null= await userRepository.findOneBy({ email: email })
  return user;
}

/**
 * Updates a user document in the database by its ID. 
 * If the user does not exist, a new document will be created. 
 * @param _id - The ID of the user to update. 
 * @param user - The user data to update or insert. 
 * @returns A promise that resolves to the updated or created user document. 
 * @throws MongooseError if the update operation fails.
 */
async function update(user : User) {

  return await userRepository.save(user)
}

/**
 * Deletes a user from the database by their unique identifier.
 * @param _id - The ObjectId of the user to be deleted.
 * @returns A promise that resolves to the deleted user document or null if not found.
 * @throws MongooseError if there is an issue with the database operation.
 */
async function remove(id : number) {
  return await userRepository.delete({id: id})
}


/**
 *  // READ (Find a single user by ID)
    console.log("Loading user by ID...");
    const userById = await userRepository.findOneBy({ id: newUser.id });
    console.log("User by ID:", userById);
 */
  async function getById(userId : number) {
    const user : User | null = await userRepository.findOne({
    where: { id: userId },
});
    return user;
}

export {create, getByEmail, getById, update, remove}

/**
 *  // READ (Find a single user by ID)
    console.log("Loading user by ID...");
    const userById = await userRepository.findOneBy({ id: newUser.id });
    console.log("User by ID:", userById);
 */