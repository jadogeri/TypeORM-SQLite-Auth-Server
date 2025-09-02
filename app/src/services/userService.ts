import { User } from "../entities/User";
import { IUser } from "../interfaces/IUser";
import { userRepository } from "../repositories/userRepository";



/**
 * Saves a new user to the repository and returns the created user object.
 * @param user - The user object to be created, adhering to the IUser interface.
 * @returns A promise that resolves to the created user object.
 * @throws Will throw an error if the user cannot be saved to the repository.
 */
async function create(user : IUser) {

  const createdUser =   await userRepository.save(user);
  return createdUser;
}


/**
 * Retrieves a user from the database by their email address.
 * @param email - The email address of the user to be retrieved.
 * @returns A Promise that resolves to a User object or null if not found.
 * @throws Throws an error if the database query fails.
 */
async function getByEmail(email : string) {
  const user : User | null= await userRepository.findOneBy({ email: email })
  return user;
}


/**
 * Saves the provided user object to the repository.
 * @param user - The user object to be updated or created in the repository.
 * @returns A promise that resolves to the saved user object.
 * @throws Throws an error if the save operation fails.
 */
async function update(user : User) {
  return await userRepository.save(user)
}


/**
 * Deletes a user from the repository by their ID.
 * @param id - The unique identifier of the user to be deleted.
 * @returns A promise that resolves to the result of the delete operation.
 * @throws Throws an error if the deletion fails or the user is not found.
 */
async function remove(id : number) {
  return await userRepository.delete({id: id})
}

/**
   * Retrieves a user by their unique identifier.
   * @param userId - The unique identifier of the user to retrieve.
   * @returns A Promise that resolves to the User object or null if not found.
   * @throws Throws an error if the database query fails.
   */
async function getById(userId : number) {     
  const user : User | null = await userRepository.findOne({
    where: { id: userId },
  });
  return user;
}

export {create, getByEmail, getById, update, remove}

