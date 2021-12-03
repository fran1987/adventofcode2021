import { readFileSync } from 'fs';

export function getInput(){

    let input = [];
    readFileSync(`input.txt`, 'utf-8').split(/\r?\n/).forEach(function(line){
        input.push(line);
    });
    return input;
}