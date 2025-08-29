import { DataSource } from "typeorm";

export class TestDatabase{

    private dataSource : DataSource;
    constructor(dataSource: DataSource){
        this.dataSource = dataSource;
    }

    getDataSource(){
        return this.dataSource;
    }

    async start(){
        return await this.dataSource.initialize();
    }

    async stop(){
        await this.dataSource.dropDatabase();
        await this.dataSource.destroy();
    }

}