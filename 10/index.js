import { getInput } from '../helpers.js';

const ILLEGAL_VALUE_TABLE = {
    [')']: 3,
    [']']: 57,
    ['}']: 1197,
    ['>']: 25137
}

const INCOMPLETE_VALUE_TABLE = {
    ['(']: 1,
    ['[']: 2,
    ['{']: 3,
    ['<']: 4
}

function first() {
    const input = getInput(10);
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        let stack = [];
        for (const char of line) {
            if (['(', '[', '{', '<'].includes(char)) {
                stack.push(char);
            } else {
                if (Math.abs(char.charCodeAt() - stack.pop().charCodeAt()) > 2) {
                    sum += ILLEGAL_VALUE_TABLE[char];
                    break;
                }
            }
        }
    }
    console.log(sum);
}

function second() {
    const input = getInput(10);

    let sums = [];
    for (const line of input) {
        let stack = [];
        let sum = 0;
        let illegal = false;
        for (const char of line) {
            if (['(', '[', '{', '<'].includes(char)) {
                stack.push(char);
            } else {
                let value = stack.pop();
                if (Math.abs(char.charCodeAt() - value.charCodeAt()) > 2) {
                    illegal = true;
                    break;
                }
            }
        }
        if (illegal) continue;

        while (stack.length) {
            let value = stack.pop();
            sum *= 5;
            sum += INCOMPLETE_VALUE_TABLE[value];
        }
        sums.push(sum);
        //console.log(sum);
    }

    sums.sort((a, b) => a - b);

    var halfIndex = Math.floor(sums.length / 2);
    console.log(sums[halfIndex]);
}

first();
second();