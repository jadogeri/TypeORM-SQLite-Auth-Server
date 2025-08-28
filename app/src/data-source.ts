import "reflect-metadata";
import { DataSource } from "typeorm";
import { Auth } from "./entities/Auth";
import { Item } from "./entities/Item";
import { User } from "./entities/User";


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.DATABASE || "sqlitedb.sqlite", // Name of your SQLite database file
    synchronize: true, // Automatically create/update tables based on entities (for development)
    logging: false, // Set to true for detailed SQL logging
    entities: [Auth, Item, User], // List your entities here
    migrations: [],
    subscribers: [],    
    entitySkipConstructor:true,
    
});