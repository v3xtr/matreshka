import * as fs from 'fs'


const buffer = fs.readFileSync("./Untitled.jpg");

const base64 = buffer.toString("base64");

const dataUri = `data:image/png;base64,${base64}`;

console.log(dataUri);
