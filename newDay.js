import { mkdirSync,writeFileSync,existsSync } from 'fs';
import { exit } from 'process';

let dayDirectory = process.argv.slice(2)[0].padStart(2, '0');

if(existsSync(dayDirectory)) exit(1);

mkdirSync(dayDirectory);
writeFileSync(`${dayDirectory}/index.js`,'');
writeFileSync(`${dayDirectory}/input.txt`, '');