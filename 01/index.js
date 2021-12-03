import { getInput } from '../helpers.js';

function first(){
    let input = getInput();
    let last = Number.MAX_VALUE, increases = 0;
    for (const iterator of input) {
        let num = Number.parseInt(iterator)
        if (num > last) increases++;
        last = num;
    }
    console.log(increases);
}
function second(){
    let input = getInput();
    let last = Number.MAX_VALUE, increases = 0;

    for(let i = 0; i< input.length - 2; i++){
        let sum = Number.parseInt(input[i]) + Number.parseInt(input[i+1]) + Number.parseInt(input[i+2]);
        if(sum > last) increases++;
        last = sum;
    }
    console.log(increases);

}

first();
second();