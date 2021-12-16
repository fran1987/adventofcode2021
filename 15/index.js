import { getInput } from '../helpers.js';

function first() {
    let start = process.hrtime.bigint();
    const input = getInput(15, false, '', Number);
    let M = input.length, N = input[0].length;
    let distances = Array(M);
    for (let i = 0; i < M; i++) {
        distances[i] = Array(N);
        for (let j = 0; j < N; j++) {
            distances[i][j] = { x: i, y: j, distance: Number.MAX_SAFE_INTEGER, visited: false, previous: null, weight : input[i][j]};

        }
    }

    distances[0][0].distance = 0;

    while (true) {

        let min = Number.MAX_SAFE_INTEGER;
        let current = null;
        for (const row of distances) {
            for (let d of row) {
                if (d.distance <= min && !d.visited) {
                    current = d;
                    min = d.distance;
                }
            }
        }
        if (!current) break;

        weighNeighbors(current, distances, M, N);
        current.visited = true;
    }
    console.log(distances[M - 1][N - 1])
    let end = process.hrtime.bigint();
    console.log(`time: ${Number(end - start) / 1_000_000} ms`)
}
function second() {
    let start = process.hrtime.bigint();
    const input = getInput(15, false, '', Number);
    let M = input.length, N = input[0].length;

    let TILES = 5;

    let distances = Array(M * TILES);
    for (let i = 0; i < M * TILES; i++) {
        let t = Math.floor(i / M);
        distances[i] = Array(N * TILES);
        for (let j = 0; j < N * TILES; j++) {
            let v = Math.floor(j / M);
            let weight = (input[i % M][j % N] + t + v) > 9 ?
                (input[i % M][j % N] + t + v) % 10 + 1 :
                (input[i % M][j % N] + t + v)
            distances[i][j] = { x: i, y: j, distance: Number.MAX_SAFE_INTEGER, visited: false, previous: null, weight };
        }
    }

    // for (let i = 0; i < M * TILES; i++) {
    //     console.log(distances.filter(d => d.x == i).sort((a, b) => a.y - b.y).map(d => d.weight).join(''));
    // }

    distances[0][0].distance = 0;

    while (true) {
        let min = Number.MAX_SAFE_INTEGER;
        let current = null;
        for (const row of distances) {
            for (let d of row) {
                if (d.distance <= min && !d.visited) {
                    current = d;
                    min = d.distance;
                }
            }
        }
        if (!current) break;

        weighNeighbors(current, distances, M * TILES, N * TILES);
        current.visited = true;

    }

    console.log(distances[TILES * M - 1][TILES * N - 1])
    let end = process.hrtime.bigint();
    console.log(`time: ${Number(end - start) / 1_000_000} ms`)
}

function weighNeighbors(current, distances, M, N) {
    for (let i = Math.max(current.x - 1, 0); i <= Math.min(current.x + 1, M - 1); i++) {
        for (let j = Math.max(current.y - 1, 0); j <= Math.min(current.y + 1, N - 1); j++) {

            if (i == current.x && j == current.y || i == 0 && j == 0) continue;
            if (i == current.x || j == current.y) {
                let neighbor = distances[i][j];
                if (!neighbor.visited && current.distance + neighbor.weight < neighbor.distance) {
                    neighbor.distance = current.distance + neighbor.weight;
                    neighbor.previous = [current.x, current.y];
                }
            }
        }
    }
}

first();
second();