import { getInput } from '../helpers.js';

function first() {
    const input = getInput(18, false);
    let sum = null;
    for(const line of input){
        let snailfish = line.split('').map(x => /\d/.test(x) ? Number(x) : x);
        if(!sum) {
            sum = snailfish;
            continue;
        }
        sum = add(sum, snailfish);
        reduce(sum);
    }
    console.log(magnitude(sum, 0));
}
function second() {
    const input = getInput(18, false);
    let max = 0, discard;
    for (let i = 0; i < input.length; i++) {
        let snailfish1 = input[i].split('').map(x => /\d/.test(x) ? Number(x) : x);
        for (let j = 0; j < input.length; j++) {
            if(i == j) continue;
            let snailfish2 = input[j].split('').map(x => /\d/.test(x) ? Number(x) : x);
            let snailfish3 = add(snailfish1, snailfish2);
            reduce(snailfish3);
            let sum = 0;
            [sum, discard] = magnitude(snailfish3, 0);
            if(sum > max) {
                //console.log(snailfish1.join(''), snailfish2.join(''), snailfish3.join(''), max, sum);
                max = sum;
            }
        }
    }
    console.log(max);
}

function reduce(snailfish){
    while(true){
        if(explodeIfAny(snailfish)) continue;
        if(!splitIfAny(snailfish)) break;
    }
}

function findNumberToLeft(snailfish, start){
    for (let i = start; i >= 0; i--) {
        if(typeof snailfish[i] === 'number') return i;
    }
    return -1;
}


function findNumberToRight(snailfish, start){
    for (let i = start; i < snailfish.length; i++) {
        if(typeof snailfish[i] === 'number') return i;
    }
    return -1;
}

function add(s1, s2) {
    return ['[', ...s1, ',', ...s2, ']'];
}

function explodeIfAny(snailfish){
    let explodingPairStart = findExplode(snailfish);
    if(explodingPairStart < 0){
        return false;
    }
    let explodingPairEnd = snailfish.indexOf(']', explodingPairStart);
    let pair = getPair(snailfish, explodingPairStart, explodingPairEnd);
    let leftNumberIndex = findNumberToLeft(snailfish, explodingPairStart);
    let rightNumberIndex = findNumberToRight(snailfish, explodingPairEnd);
    if(leftNumberIndex > 0){
        snailfish[leftNumberIndex] += pair[0];
    }
    if(rightNumberIndex > 0){
        snailfish[rightNumberIndex] += pair[1];
    }
    snailfish.splice(explodingPairStart, 5, 0);
    return true;
}

function splitIfAny(snailfish){
    let splitIndex = findSplit(snailfish);
    if(splitIndex < 0) return false;

    let num = snailfish[splitIndex];

    snailfish.splice(splitIndex, 1, ...add([Math.floor(num / 2)], [Math.ceil(num  / 2)]));
    return true;
}

function findExplode(snailfish) {
    let depth = 0;
    for (let i = 0; i < snailfish.length; i++) {
        switch (snailfish[i]) {
            case '[':
                depth++;
                break;
            case ']':
                depth--;
                break;
            default:
                break;
        }
        if(depth == 5) return i;
    }
    return -1;
}

function magnitude(snailfish, i){
    let left, leftSize, right, rightSize;
    if(typeof snailfish[i] === 'number' ) return [snailfish[i], 1];
    [left, leftSize] = magnitude(snailfish, i + 1);
    snailfish.splice(i + 1, leftSize, left);
    [right, rightSize] = magnitude(snailfish, i + 3);
    snailfish.splice(i + 3, rightSize, right);
    return [3 * left + 2 * right, 5]
}


function findSplit(snailfish){
    return snailfish.findIndex(x => x >= 10);
}

function getPair(snailfish, start, end){
    return snailfish.filter((x,i) => typeof x === 'number' && i > start && i < end);
}
first();
second();