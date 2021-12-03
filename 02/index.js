import { getInput } from '../helpers.js';

function first(){
    let input = getInput();
    let x = 0, y = 0;
    let re = /([a-z]+) (\d+)/;
    for(let cmd of input){
        let match = cmd.match(re);
        let op = match[1];
        let val = Number.parseInt(match[2]);

        if(op === 'forward'){
            x += val;
        }else if(op === 'up'){
            y -= val;
        }else if (op ==='down'){
            y += val;
        }
    }
    console.log(x,y, x*y);
}
first();

function second(){
    let input = getInput();
    let x = 0, y = 0, aim = 0;
    let re = /([a-z]+) (\d+)/;
    for(let cmd of input){
        let match = cmd.match(re);
        let op = match[1];
        let val = Number.parseInt(match[2]);

        if(op === 'forward'){
            x += val;
            y += aim*val;
        }else if(op === 'up'){
            aim -= val;
        }else if (op ==='down'){
            aim += val;
        }
    }
    console.log(x,y, x*y);
}
second();