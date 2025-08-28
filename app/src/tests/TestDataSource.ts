import "reflect-metadata";
import { DataSource } from "typeorm";

export const TestDataSource = (entities : any) =>{
    return new DataSource({
        type: "sqlite",
        database: ":memory:", // Name of your SQLite database file
        synchronize: true, // Automatically create/update tables based on entities (for development)
        logging: false, // Set to true for detailed SQL logging
        entities: [...entities], // List your entities here
        migrations: [],
        subscribers: [],    
        entitySkipConstructor:true,
        
    });

}

