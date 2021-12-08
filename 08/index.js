import { getInput } from '../helpers.js';

/*
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

*/

function first() {
    const input = getInput(8);
    let count = 0;
    for (const line of input) {
        count += line.split(/[ |]/).filter((x, i) => i > 9 && [2, 3, 4, 7].includes(x.length)).length;
    }
    console.log(count);
}
first();
function second() {
    const input = getInput(8);
    let sum = 0;
    let segments = Array(10);
    for (const line of input) {
        let signal = line.split(/[ |]/).filter((x, i) => x.length).map(x => x.split('').sort().join(''));
        let sortedSignal = [...signal].sort((a,b) => a.length - b.length);
        for (const digit of sortedSignal) {
            let digitArray =  digit.split('');
            if (digit.length === 2) segments[1] = digitArray;
            else if (digit.length === 3) segments[7] = digitArray;
            else if (digit.length === 4) segments[4] = digitArray;
            else if (digit.length === 5) {  //2, 3, 5
                if(segments[1].every(c => digitArray.includes(c))) segments[3] = digitArray;  //3 sadrži sve elemente od 1
                else if (segments[4].filter(x => !segments[1].includes(x)).every(c => digitArray.includes(c))) segments[5] = digitArray; //5 sadrži razliku između 4 i 1
                else segments[2] = digitArray;  // inače je 2
                
            } else if (digit.length === 6) {   //0, 6, 9
                if(segments[4].every(c => digitArray.includes(c))) segments[9] = digitArray;  //9 sadrži sve elemente od 4
                else if(segments[1].every(c => digitArray.includes(c))) segments[0] = digitArray;   // 0 sadrži sve elemente 1 (ako nije 9)
                else segments[6] = digitArray;
            } else {
                segments[8] = digitArray;
            }
        }

        let output = '';
        for (let i = 10; i < 14; i++){
            output += segments.findIndex(x=> x.join('') == signal[i]);
        }
        sum += parseInt(output);
    }
    console.log(sum);
};
second();

