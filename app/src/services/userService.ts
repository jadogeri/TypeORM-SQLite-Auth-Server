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

export {create}