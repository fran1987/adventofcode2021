import { getInput } from '../helpers.js';

function first(noDiagonals){
    const input = getInput();
    let segments = [];
    for (const line of input) {
        let matches = line.match(/(\d+),(\d+) -> (\d+),(\d+)/);
        let segment = matches.slice(1, 5).map(x=>parseInt(x));
        if(!noDiagonals || (segment[0] === segment[2] || segment[1]===segment[3]))
            segments.push(segment);
    }

    let vents = new Map();
    for (const segment of segments) {
        let x1, y1, x2, y2;
        [x1,y1,x2,y2] = [...segment];
        let x = x1, y = y1;

        while(true){
            vents = upsertVents(x, y, vents);
            if(x < x2) x++;
            else if(x > x2)x--;

            if(y < y2) y++;
            else if(y > y2) y--;
        
            if(x == x2 && y == y2) break;
        }
        vents = upsertVents(x2, y2, vents);
    }   
    console.log(Array.from(vents.values()).filter(x=>x>1).length);
    return;
}
first(true);

function second(){
    first(false);
}
second();

function upsertVents(x,y,vents){
    let vent = `${x}-${y}`;
    if(vents.has(vent)){
        vents.set(vent, vents.get(vent) + 1);
    }else{
        vents.set(vent, 1);
    }
    return vents;
}