import "reflect-metadata";
import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite", // Name of your SQLite database file
    synchronize: true, // Automatically create/update tables based on entities (for development)
    logging: false, // Set to true for detailed SQL logging
    entities: [], // List your entities here
    migrations: [],
    subscribers: [],    
});