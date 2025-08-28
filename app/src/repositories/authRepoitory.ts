import { AppDataSource } from "../data-source";
import { Auth } from "../entities/Auth";


export const authRepository = AppDataSource.getRepository(Auth);
