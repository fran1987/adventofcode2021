import { getInput } from '../helpers.js';

function first(){
    let input = getInput();
    let freqs = new Array(input[0].length);
    freqs.fill(0);

    for(let i = 0; i < input.length; i++){
        for(let j = 0; j < freqs.length; j++){
            if(input[i][j] === '1') freqs[j]++;
        }
    }
    let gamma = '', epsilon = '';
    for(let i = 0; i < freqs.length; i++){
        if(freqs[i] > input.length / 2) {
            gamma += '1'
            epsilon += '0';
        }else{
            gamma += '0';
            epsilon += '1';
        }
    }
    console.log(gamma, parseInt(gamma, 2), epsilon, parseInt(epsilon, 2), parseInt(gamma, 2) * parseInt(epsilon, 2));   
}

first();