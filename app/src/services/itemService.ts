import { User } from "../entities/User";
import { Item } from "../entities/Item";
import { itemRepository } from "../repositories/itemRepository";


import { IJwtPayload } from "../interfaces/IJWTPayload";
import { IItem } from "../interfaces/IItem";

async function getAll(req : IJwtPayload) {
  const items : Item[] | null = await itemRepository.find({ where: { user: { id: req.user.id }},
  });
  return items;
}

async function getById(itemId : number) {
  const item : Item | null = await itemRepository.findOne({
    where: { id: itemId },
  });
  return item;
}

async function getByUserId(itemId : number, user: User) {
  const item : Item | null = await itemRepository.findOne({
    where: { id: itemId, user: { id: user.id } },
  });
  return item;
}


async function create(item : IItem) {
  const createdItem : Item | null = await itemRepository.save(item);
//  console.log("created item\n", JSON.stringify(createdItem, null, 4))

  return  createdItem;
}

async function update(itemId : number,payload : IItem) {
    return itemRepository.update(
      {id : itemId}, // Filter
      {...payload}, // Update
  );
}

async function removeAll(req : IJwtPayload) {
  return itemRepository.delete({ user: { id: req.user.id } });
}

async function deleteByUserId(itemId: number, req : IJwtPayload) {
  return itemRepository.delete({ id: itemId, user: { id: req.user.id } });
}

export { getById, getByUserId, getAll, create, removeAll, deleteByUserId, update };
