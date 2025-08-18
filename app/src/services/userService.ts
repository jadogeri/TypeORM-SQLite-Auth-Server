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

export {create, getByEmail}

/**
 *  // READ (Find a single user by ID)
    console.log("Loading user by ID...");
    const userById = await userRepository.findOneBy({ id: newUser.id });
    console.log("User by ID:", userById);
 */