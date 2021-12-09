import { mkdirSync,writeFileSync,existsSync, copyFileSync } from 'fs';
import { exit } from 'process';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

let day = process.argv.slice(2)[0];

let dayDirectory = day.padStart(2, '0');

if(existsSync(dayDirectory)) exit(1);

mkdirSync(dayDirectory);
copyFileSync('template.js', `${dayDirectory}/index.js`,)
// writeFileSync(`${dayDirectory}/index.js`,'');
writeFileSync(`${dayDirectory}/testInput.txt`,'');

axios.get(`https://adventofcode.com/2021/day/${day}/input`,{
    "headers": { Cookie: `session=${process.env.session}` }
}).then(({data}) => {
    writeFileSync(`${dayDirectory}/input.txt`, data.trim());
});
