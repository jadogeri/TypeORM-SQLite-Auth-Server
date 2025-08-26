import { Auth } from "../entities/Auth";
import { AppDataSource } from "../data-source";
import { IAuth } from "../interfaces/IAuth";
import { User } from "../entities/User";

const authRepository = AppDataSource.getRepository(Auth);



/**
 * Retrieves the authentication record associated with a given user ID.
 * @param userId - The ID of the user for whom to retrieve the authentication record.
 * @returns A promise that resolves to the Auth object or null if not found.
 * @throws Throws an error if the database query fails.
 */
async function getByUserId(userId : number) {
  const auth : Auth | null = await authRepository.findOne({
  where: { user: { id: userId }},
  });
  return auth;
}

/**
 * Retrieves an authentication object by its token.
 * @param token - The token string used to find the authentication record.
 * @returns A promise that resolves to an Auth object or null if not found.
 * @throws Throws an error if the database query fails.
 */
async function getByToken(token : string) {
  const auth : Auth | null = await authRepository.findOneBy({ token });

  return auth
}


async function create(auth : IAuth) {

  return await authRepository.save(auth);
}


async function update(auth : IAuth ) {
  const createdAuth = await authRepository.findOne({
    where: { user: { id: auth.user?.id }}}) as Auth
  createdAuth.token = auth.token as string
  //return await authRepository.update({token:auth.token},{ user: { id: auth?.user?.id }})
  return await authRepository.save(createdAuth);

}


async function removeByUser(user: User) {
  return await authRepository.delete({user: user});
}


async function remove(id: number) {
  return await authRepository.delete({id: id});
}


export { getByUserId, getByToken, update, create, remove, removeByUser };

