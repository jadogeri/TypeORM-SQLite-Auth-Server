import { Auth } from "../entities/Auth";
import { IAuth } from "../interfaces/IAuth";
import { User } from "../entities/User";
import { authRepository } from "../repositories/authRepository";


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


async function getByToken(token : string) {
  const auth : Auth | null = await authRepository.findOne({ where: { token: token } });

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

