import { User } from "../entities/User";
import { Item } from "../entities/Item";
import { itemRepository } from "../repositories/itemRepository";


import { IJwtPayload } from "../interfaces/IJWTPayload";
import { IItem } from "../interfaces/IItem";

/**
 * Retrieves all items associated with the specified user.
 * @param req - The request object containing user information from the JWT payload.
 * @returns A promise that resolves to an array of Item objects or null if no items are found.
 * @throws Throws an error if the database query fails.
 */
async function getAll(req : IJwtPayload) {
  const items : Item[] | null = await itemRepository.find({ where: { user: { id: req.user.id }},
  });
  return items;
}

/**
 * Retrieves an item by its unique identifier from the repository.
 * @param itemId - The unique identifier of the item to retrieve.
 * @returns The item if found, otherwise null. May throw an error if the repository query fails.
 */
async function getById(itemId : number) {
  const item : Item | null = await itemRepository.findOne({
    where: { id: itemId },
  });
  return item;
}

/**
   * Retrieves an item by its ID for a specific user.
   * @param itemId - The ID of the item to retrieve.
   * @param user - The user object associated with the item.
   * @returns The item if found, otherwise null.
   * @throws Throws an error if the database query fails.
   */
async function getByUserId(itemId : number, user: User) {
  const item : Item | null = await itemRepository.findOne({
    where: { id: itemId, user: { id: user.id } },
  });
  return item;
}



/**
 * Saves a new item to the repository and returns the created item.
 * @param item - The item to be created, adhering to the IItem interface.
 * @returns The created item or null if the save operation fails.
 * @throws Throws an error if the save operation encounters an issue.
 */
async function create(item : IItem) {
  const createdItem : Item | null = await itemRepository.save(item);
//  console.log("created item\n", JSON.stringify(createdItem, null, 4))

  return  createdItem;
}

/**
 * Updates an item in the repository with the provided payload.
 * @param itemId - The unique identifier of the item to be updated.
 * @param payload - The new data to update the item with.
 * @returns A promise that resolves to the result of the update operation.
 * @throws Throws an error if the update operation fails.
 */
async function update(itemId : number,payload : IItem) {
    return itemRepository.update(
      {id : itemId}, // Filter
      {...payload}, // Update
  );
}

/**
 * Deletes all items associated with the user specified in the request payload.
 * 
 * @param req - The request payload containing user information.
 * @returns A promise that resolves to the result of the delete operation.
 * @throws Throws an error if the delete operation fails.
 */
async function removeAll(req : IJwtPayload) {
  return itemRepository.delete({ user: { id: req.user.id } });
}

/**
 * Deletes an item from the repository based on the provided item ID and user ID from the request payload.
 * 
 * @param itemId - The ID of the item to be deleted.
 * @param req - The request payload containing user information.
 * @returns A promise that resolves to the result of the delete operation.
 * @throws Throws an error if the item cannot be found or if the user is not authorized to delete it.
 */
async function deleteByUserId(itemId: number, req : IJwtPayload) {
  return itemRepository.delete({ id: itemId, user: { id: req.user.id } });
}

export { getById, getByUserId, getAll, create, removeAll, deleteByUserId, update };
