import "reflect-metadata";
import { DataSource } from "typeorm";
import { Auth } from "./entities/Auth";
import { Item } from "./entities/Item";
import { User } from "./entities/User";

let databaseNames = ["prodDB.sqlite", "testDB.sqlite","devDB.sqlite" ] 
const database = ()=>{
    console.log("environment =========", process.env.ENVIRONMENT as string)
    switch(process.env.ENVIRONMENT){
        case "PROD":
            return databaseNames[0]
        case "TEST":
            return databaseNames[1]
        case "DEV":
            return databaseNames[2]
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

