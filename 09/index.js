import { getInput } from '../helpers.js';

function first() {
    const input = getInput(9);
    let matrix = input.map(x => x.split('').map(Number));

    let lowPoints = getLowPoints(matrix);

    let sum = lowPoints.reduce((acc, n) => acc + matrix[n[0]][n[1]] + 1, 0);

    console.log(sum);
    return lowPoints;
}
function second() {
    const input = getInput(9);
    let matrix = input.map(x => x.split('').map(Number));
    let M = matrix.length, N = matrix[0].length;

    let lowPoints = getLowPoints(matrix);

    let basinSizes = [];
    for (const lowPoint of lowPoints) {
        basinSizes.push(traverseBasin(matrix, lowPoint[0], lowPoint[1], M, N));
    }
    let top3 = basinSizes.sort((a, b) => a - b).slice(basinSizes.length - 3, basinSizes.length);
    console.log(top3, top3.reduce((acc, x) => acc * x, 1));
}

function traverseBasin(matrix, i, j, M, N) {
    if (i < 0 || i > M - 1 || j < 0 || j > N - 1 || matrix[i][j] === 9) {
        return 0;
    }
    let basinSize = 1;
    matrix[i][j] = 9;
    basinSize += traverseBasin(matrix, i, j - 1, M, N);
    basinSize += traverseBasin(matrix, i, j + 1, M, N);
    basinSize += traverseBasin(matrix, i - 1, j, M, N);
    basinSize += traverseBasin(matrix, i + 1, j, M, N);

    return basinSize;
}

function getLowPoints(matrix) {
    let lowPoints = [];
    let M = matrix.length, N = matrix[0].length;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const element = matrix[i][j];
            if ((i == 0 || matrix[i][j] < matrix[i - 1][j]) &&
                (i == M - 1 || matrix[i][j] < matrix[i + 1][j]) &&
                (j == 0 || matrix[i][j] < matrix[i][j - 1]) &&
                (j == N - 1 || matrix[i][j] < matrix[i][j + 1])) {
                lowPoints.push([i, j]);
            }
        }
    }
    return lowPoints;
}

first();
second();