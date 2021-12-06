import { readFileSync } from 'fs';

export function getInput(day){

    let input = [];
    let path = `input.txt`;
    if(day){
        path = `${String(day).padStart(2, '0')}/input.txt`;
    }
    readFileSync(path, 'utf-8').split(/\r?\n/).forEach(function(line){
        input.push(line);
    });
    return input;
}