


import * as fs from 'fs';

export const fileWriter = (filePath: string, data : string) =>  {

    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error('Failed to write JSON to file:', err);
            return;
        }
        console.log(`Successfully wrote JSON data to ${filePath}`);
    });  

}