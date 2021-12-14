import { getInput } from '../helpers.js';

function first(){
    const input = getInput(14);
    let template = input.slice(0, input.findIndex(x => x.length === 0))[0];
    let rules = input.slice(input.findIndex(x => x.length === 0) + 1).map(x => x.split('->').map(c => c.trim()));

    for (let step = 0; step < 10; step++) {
        let newTemplate = template;
        for (let i = 0; i < template.length - 1; i++) {
            let rule = rules.find(x => x[0] == template.substr(i, 2));
            newTemplate = newTemplate.slice(0, 2*i + 1) + rule[1] + newTemplate.slice(2*i + 1);
        }
        template = newTemplate;
    }
    let chars = {};
    for (const char of template) {
        upsertCount(chars, char, 1);
    }
    let max, min;
    [max, min] = [Math.max(...Object.values(chars)), Math.min(...Object.values(chars))];
    console.log(max - min);
}
function second(){
    const input = getInput(14);
    let template = input.slice(0, input.findIndex(x => x.length === 0))[0];
    let rules = input.slice(input.findIndex(x => x.length === 0) + 1).map(x => x.split('->').map(c => c.trim()));
    let pairs = {};
    for (let i = 0; i < template.length - 1; i++) {
        upsertCount(pairs, template.substr(i, 2));
    }

    for (let step = 0; step < 40; step++) {
        let newPairs = {};
        for (const key in pairs) {
            let rule = rules.find(x => x[0] == key);
            upsertCount(newPairs, `${key[0]}${rule[1]}`, pairs[key]);
            upsertCount(newPairs, `${rule[1]}${key[1]}`, pairs[key]);
        }
        pairs = newPairs;
    }  
    let freqs = {};

    [...new Set(Object.keys(pairs).join(''))].forEach(x => freqs[x] = 0);

    for (const pair in pairs) {
        freqs[pair[0]] += pairs[pair];
        freqs[pair[1]] += pairs[pair];
    }
    let max, min;
    [max, min] = [Math.ceil(Math.max(...Object.values(freqs)) / 2), Math.ceil(Math.min(...Object.values(freqs)) / 2)];
    console.log(max - min);
}

function upsertCount(dict, key, value){
    if(dict[key]) dict[key] = dict[key] + value ?? 1;
    else dict[key] = value ?? 1;
}

first();
second();