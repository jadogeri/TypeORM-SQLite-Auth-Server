


import * as fs from 'fs';

export const fileReader = async (path : string) =>  {
  try {
    const rawData = fs.readFileSync(path, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error reading file ${path}:`, error);
    return {};
  }

}

