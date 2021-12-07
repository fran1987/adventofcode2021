import { getInput } from '../helpers.js';

function first(){
    const input = getInput(7);
    let numbers = input[0].split(',').map(Number);

    const avg = numbers.reduce((a, b) => a + b) / numbers.length;
    const med = median(numbers);

    let costs = numbers.reduce((a, b, i) => a + Math.abs(b - med), 0);

    console.log(avg, med, costs);   //ne znam zašto radi :D
}
first();

function second(){
    const input = getInput(7);
    let numbers = input[0].split(',').map(Number);

    const avg = numbers.reduce((a, b) => a + b) / numbers.length;
    const med = median(numbers);

    let position1 = Math.ceil(avg);
    let costs1 = numbers.reduce((a, b) => a + gauss(Math.abs(b - position1)), 0);

    let position2 = Math.floor(avg);
    let costs2 = numbers.reduce((a, b) => a + gauss(Math.abs(b - position2)), 0);
    
    console.log(avg, med, costs1, position1, costs2, position2);    //ni ovo :D
}
second();

function gauss(number){
    return number * (number + 1) / 2;
}


function median(values){
    if(values.length ===0) throw new Error("No inputs");
  
    values.sort(function(a,b){
      return a-b;
    });
  
    var half = Math.floor(values.length / 2);
    
    if (values.length % 2)
      return values[half];
    
    return (values[half - 1] + values[half]) / 2.0;
  }