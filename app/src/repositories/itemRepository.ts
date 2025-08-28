import { AppDataSource } from "../data-source";
import { Item } from "../entities/Item";

export const itemRepository = AppDataSource.getRepository(Item);
