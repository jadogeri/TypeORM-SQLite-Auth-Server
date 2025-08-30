


import * as fs from 'fs';

export const fileWriter = () =>  {

    console.log("running file writer")
    const file = "hello.txt"
    fs.writeFileSync(file,'hello by test db');    

}