import { getInput } from '../helpers.js';

function first(days = 80){
    let input = getInput(6);
    let fish = input[0].split(',').map(x=>parseInt(x));
    let day = 0;

    let fishMap = new Array(9);
    fishMap.fill(0);

    fish.map(x=> fishMap[x]++);

    while(day < days){
        let newFish = new Array(9);
        newFish.fill(0);
        for(let i = 0; i < fishMap.length; i++){
            if(i == 0){
                newFish[6] += fishMap[i];
                newFish[8] += fishMap[i];
            }else{
                newFish[i - 1] += fishMap[i];
            }
        }
        fishMap = newFish;
        day++;
    }
    console.log(fishMap.reduce((acc, x) => acc + x));
}
first();

function second(){
    first(256);
}

second();