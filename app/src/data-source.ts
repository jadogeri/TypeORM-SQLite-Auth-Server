import "reflect-metadata";
import { DataSource } from "typeorm";
import { Auth } from "./entities/Auth";
import { Item } from "./entities/Item";
import { User } from "./entities/User";
import { DatabaseNameType } from "./types/DatabaseNameType";

let databaseNames : DatabaseNameType[] =  ["prodDB.sqlite", "testDB.sqlite","devDB.sqlite",":memory:"] 
const database = ()=>{
    switch(process.env.ENVIRONMENT){
        case "PROD":
            return databaseNames[0]
        case "TEST":
            return databaseNames[1]
        case "DEV":
            return databaseNames[2]
        case "VIRTUAL":
            return databaseNames[3]
        default:
            return undefined
    }    
}

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: database() || process.env.DATABASE as string || "sqlitedb.sqlite", // Name of your SQLite database file
    synchronize: true, // Automatically create/update tables based on entities (for development)
    logging: false, // Set to true for detailed SQL logging
    entities: [Auth, Item, User], // List your entities here
    migrations: [],
    subscribers: [],    
    entitySkipConstructor:true,
    
});

