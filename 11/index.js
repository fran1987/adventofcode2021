import { getInput } from '../helpers.js';

let STEPS = 100;

function first() {
    const input = getInput(11);
    let octopi = input.map(line => line.split('').map(Number));
    let count = 0;
    for (let step = 0; step < STEPS; step++) {
        let flashes = [];
        for (let i = 0; i < octopi.length; i++) {
            for (let j = 0; j < octopi[i].length; j++) {
                octopi[i][j]++;
                if (octopi[i][j] == 10) {
                    flashes.push({ x: i, y: j });
                    count++;
                }
            }
        }
        while (flashes.length) {
            let flash = flashes.pop();
            for (let i = Math.max(0, flash.x - 1); i <= Math.min(9, flash.x + 1); i++) {
                for (let j = Math.max(0, flash.y - 1); j <= Math.min(9, flash.y + 1); j++) {
                    octopi[i][j]++; 
                    if (octopi[i][j] == 10) {
                        flashes.push({ x: i, y: j });
                        count++;
                    }
                }
            }
        }
        let zeros = 0;
        for (let i = 0; i < octopi.length; i++) {
            for (let j = 0; j < octopi[i].length; j++) {
                if(octopi[i][j] > 9) {
                    octopi[i][j] = 0;
                    zeros++;
                }
            }
        }
    }
    console.log(count);
}
function second() {
    const input = getInput(11);
    let octopi = input.map(line => line.split('').map(Number));
    let step = 1;
    while(true){
        let flashes = [];
        for (let i = 0; i < octopi.length; i++) {
            for (let j = 0; j < octopi[i].length; j++) {
                octopi[i][j]++;
                if (octopi[i][j] == 10) {
                    flashes.push({ x: i, y: j });
                }
            }
        }
        while (flashes.length) {
            let flash = flashes.pop();
            for (let i = Math.max(0, flash.x - 1); i <= Math.min(9, flash.x + 1); i++) {
                for (let j = Math.max(0, flash.y - 1); j <= Math.min(9, flash.y + 1); j++) {
                    octopi[i][j]++; 
                    if (octopi[i][j] == 10) {
                        flashes.push({ x: i, y: j });
                    }
                }
            }
        }
        let zeros = 0;
        for (let i = 0; i < octopi.length; i++) {
            for (let j = 0; j < octopi[i].length; j++) {
                if(octopi[i][j] > 9) {
                    octopi[i][j] = 0;
                    zeros++;
                }
            }
        }
        if(zeros === 100){
            console.log(step);
            break;
        }
        step++;
    }
}

first();
second();