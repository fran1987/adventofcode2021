const BOARD_SIZE = 5;
import { getInput } from '../helpers.js';

function first() {
    let drawnNumbers, boards;
    [boards, drawnNumbers] = parseBoards();
    
    for(let i = 0; i < drawnNumbers.length; i++){
        for (let j = 0; j < boards.length; j++) {
            let sum = doesBoardWin(boards[j], drawnNumbers.slice(0, i));
            if(sum > 0){
                console.log(i, j, sum, drawnNumbers[i], sum * drawnNumbers[i-1]);
                return;
            }   
        }
    }
}
first();

function second(){
    let drawnNumbers, boards;
    [boards, drawnNumbers] = parseBoards();
    let done = [];

    for(let i = 0; i < drawnNumbers.length; i++){
        for (let j = 0; j < boards.length; j++) {
            if(done.includes(j)) 
                continue;
            let sum = doesBoardWin(boards[j], drawnNumbers.slice(0, i));
            if(sum > 0){
                if(done.length == boards.length - 1){
                    console.log(i, j, sum, drawnNumbers[i], sum * drawnNumbers[i-1]);
                }
                done.push(j);
            }   
        }
    }
}
second();

function parseBoards(){
    let input = getInput();
    let boards = [];
    let drawnNumbers = input[0].split(',').map(x=>parseInt(x));
    let board= [];
    for (let i = 2; i < input.length; i++) {
        const line = input[i];
        if(line.length == 0) continue;
        board.push(line.trim().split(/[ ]+/).map(x=>parseInt(x)));

        if(board.length == BOARD_SIZE){
            boards.push(board);
            board = [];
        }
    }
    return [boards, drawnNumbers];
}

function doesBoardWin(board, drawnNumbers) {
    let hits = new Array(BOARD_SIZE);
    hits.fill(1);
    let boardSum = 0;
    let found = false;
    for (let i = 0; i < BOARD_SIZE; i++) {
        let wholeRowHits = true;
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (!drawnNumbers.includes(board[i][j])) {
                wholeRowHits = false;
                boardSum += board[i][j];
                hits[j] = 0;
            }else {
                //boardSum -= 10000;
            }
        }
        if (wholeRowHits) found = true;
    }
    if(hits.some(x=>x)) found = true;
    if(found) return boardSum;
    else return -1;
}