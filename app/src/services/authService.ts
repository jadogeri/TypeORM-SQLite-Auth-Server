import { Auth } from "../entities/Auth";
import { AppDataSource } from "../data-source";
import { IAuth } from "../interfaces/IAuth";
import { User } from "../entities/User";

const authRepository = AppDataSource.getRepository(Auth);


/**
 * Retrieves an authentication record by its unique identifier.
 * @param id - The unique identifier of the authentication record (ObjectId).
 * @returns A promise that resolves to the found authentication record or null if not found.
 * @throws Throws an error if the database query fails.
 */
async function getByUserId(userId : number) {
  const auth : Auth | null = await authRepository.findOne({
  where: { user: { id: userId }},
  });
  return auth;
}

/**
 * Retrieves an authentication record by the provided token.
 * @param token - The token string used to find the corresponding Auth record.
 * @returns A promise that resolves to the found Auth record or null if not found.
 * @throws Throws an error if the database query fails.
 */
async function getByToken(token : string) {
  const auth : Auth | null = await authRepository.findOneBy({ token });

  return auth
}

/**
 * Creates a new user in the database.
 * @param user - An object implementing the IUser interface representing the user to be created.
 * @returns A promise that resolves to the created user object.
 * @throws Throws an error if the user creation fails due to validation or database issues.
 */
async function create(auth : IAuth) {

  return await authRepository.save(auth);
}

/**
 * Updates a user document in the database by its ID. 
 * If the user does not exist, a new document will be created. 
 * @param _id - The ID of the user to update. 
 * @param user - The user data to update or insert. 
 * @returns A promise that resolves to the updated or created user document. 
 * @throws MongooseError if the update operation fails.
 */
async function update(auth : IAuth ) {
  const createdAuth = await authRepository.findOne({
    where: { user: { id: auth.user?.id }}}) as Auth
  createdAuth.token = auth.token as string
  //return await authRepository.update({token:auth.token},{ user: { id: auth?.user?.id }})
  return await authRepository.save(createdAuth);

}

/**
 * Deletes a user from the database by their unique identifier.
 * @param _id - The ObjectId of the user to be deleted.
 * @returns A promise that resolves to the deleted user document or null if not found.
 * @throws MongooseError if there is an issue with the database operation.
 */
async function removeByUser(user: User) {
  return await authRepository.delete({user: user});
}

/**
 * Deletes a user from the database by their unique identifier.
 * @param _id - The ObjectId of the user to be deleted.
 * @returns A promise that resolves to the deleted user document or null if not found.
 * @throws MongooseError if there is an issue with the database operation.
 */
async function remove(id: number) {
  return await authRepository.delete({id: id});
}


export { getByUserId, getByToken, update, create, remove, removeByUser };

