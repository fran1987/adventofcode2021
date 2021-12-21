import { getInput } from '../helpers.js';

function first() {
    const input = getInput(17, false);
    let target = parseInput(input);
    let maxVelocityY = (target[1][0] + 1) * target[1][0] / 2;
    console.log(maxVelocityY);
}
function second() {
    const input = getInput(17, false);
    let target = parseInput(input);
    let maxVelocityY = (target[1][0] + 1) * target[1][0] / 2;
    let sum = 0;
    for (let i = 1; i <= target[0][1]; i++) {
        for (let j = maxVelocityY; j >= maxVelocityY * -1; j--) {
            let xCurr = 0, yCurr = 0;
            let xGen = xStep(i);
            let yGen = yStep(j, maxVelocityY * -1);

            while (true) {
                let xN = xGen.next().value;
                xCurr += xN;
                let yN = yGen.next().value;
                yCurr += yN;
                if (xN == 0 && xCurr < target[0][0] || xCurr > target[0][1]) break;
                if (yN <= maxVelocityY * -1) break;
//console.log(xCurr, yCurr);
                if (xCurr >= target[0][0] && xCurr <= target[0][1] && yCurr >= target[1][0] && yCurr <= target[1][1]) {
                    sum++;
                    //console.log(i, j, xCurr, yCurr);
                    break;
                }
            }
        }
    }
    console.log(sum);
}

function parseInput(input) {
    return input.split(/:|,/).slice(1).map(x => x.split(/=|\.\./).slice(1).map(Number));
}

function* xStep(x) {
    while (true) {
        yield x > 0 ? x-- : x;
    }
}

function* yStep(y, limit) {
    while (true) {
        yield y--;
    }
}

first();
second();