import { DataSource } from "typeorm";

export class TestDatabase{

    private dataSource : DataSource;
    constructor(dataSource: DataSource){
        this.dataSource = dataSource;
    }

    getDataSource(){
        return this.dataSource;
    }

}