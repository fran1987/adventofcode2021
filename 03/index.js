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

function second(){
    let input = getInput();
    let bits = input[0].length;

    let data = input;
    for(let i = 0; i < bits; i++){
        let noOfOnes = data.reduce((acc, x ) => acc + (x[i]==='1' ? 1 : 0), 0);
        let digitToFind = noOfOnes >= data.length / 2 ? '1' : '0';
        data = data.filter(x=>x[i] === digitToFind);
        if (data.length === 1) break;
    }
    let o2Rating = data[0];

    data = input;
    for(let i = 0; i < bits; i++){
        let noOfOnes = data.reduce((acc, x ) => acc + (x[i]==='1' ? 1 : 0), 0);
        let digitToFind = noOfOnes < data.length / 2 ? '1' : '0';
        data = data.filter(x=>x[i] === digitToFind);
        if (data.length === 1) break;
    }
    let co2Rating = data[0];
    console.log(o2Rating, Number.parseInt(o2Rating, 2), co2Rating, Number.parseInt(co2Rating,2), parseInt(o2Rating, 2) * parseInt(co2Rating, 2));

}
second();