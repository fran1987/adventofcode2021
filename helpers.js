import { readFileSync } from 'fs';

export function getInput(day, test) {

    let input = [];
    let directory = ''
    let fileName = 'input.txt'
    if(test) fileName = 'testInput.txt';
    if (day) {
        directory = `${String(day).padStart(2, '0')}/`;
    }
    let path = `${directory}${fileName}`;
    readFileSync(path, 'utf-8').split(/\r?\n/).forEach(function (line) {
        input.push(line);
    });
    return input;
}
