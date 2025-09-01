import * as fs from 'fs';

export function fileRemover(filePath: string) {
fs.unlink(filePath, (err) => {
    if (err) {
       // console.error(`Error deleting file: ${err}`);
        return;
    }
    //console.log(`${filePath} was deleted successfully.`);
});
}