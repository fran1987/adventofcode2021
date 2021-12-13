import { getInput } from '../helpers.js';

function first() {
    const input = getInput(13);
    let dots = input.slice(0, input.findIndex(x => x.length === 0)).map(x => x.split(',').map(Number));
    let folds = input.slice(input.findIndex(x => x.length === 0) + 1).map(x => x.substr(11).split('='));

    dots = foldAll(dots, folds, true);

    console.log(dots.length);
}
function second() {
    const input = getInput(13);
    let dots = input.slice(0, input.findIndex(x => x.length === 0)).map(x => x.split(',').map(Number));
    let folds = input.slice(input.findIndex(x => x.length === 0) + 1).map(x => x.substr(11).split('='));

    dots = foldAll(dots, folds);

    let M = Math.max(...dots.map(x => x[0])) + 1;
    let N = Math.max(...dots.map(x => x[1])) + 1;

    for (let i = 0; i < N; i++) {
        let rowDots = dots.filter(x => x[1] === i).map(x => x[0]);
        let line = [];
        for (let j = 0; j < M; j++) {
            line.push(rowDots.includes(j) ? '#' : '.');
        }
        console.log(line.join(''));
    }
}


function foldAll(dots, folds, singleFoldOnly) {
    for (const fold of folds) {
        let alongLine = Number(fold[1]);
        let newDots = [];
        for (const dot of dots) {
            if (fold[0] === 'x' && dot[0] > alongLine) {
                newDots.push([alongLine * 2 - dot[0], dot[1]]);
            } else if (fold[0] === 'y' && dot[1] > alongLine) {
                newDots.push([dot[0], alongLine * 2 - dot[1]]);
            } else {
                newDots.push(dot);
            }
        }

        dots = newDots.filter((dot, index, self) => self.findIndex(d => d[0] === dot[0] && d[1] === dot[1]) === index);
        if (singleFoldOnly) break;
    }
    return dots;
}

first();
second();