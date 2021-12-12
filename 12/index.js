import { getInput } from '../helpers.js';

function first(){
    const input = getInput(12).map(x => x.split('-'));
    let paths = findPaths(input, 'start', [], []);
    console.log(paths.length);
}
function second(){
    const input = getInput(12).map(x => x.split('-'));
    let paths = findPaths(input, 'start', [], [], true, null);
    console.log(paths.length);
}

function findPaths(connections, position, currentPath, paths, singleSmallCaveTwice, interestingSmallCave){
    if(position.charCodeAt(0) >= 97 && currentPath.includes(position)){
        if(!singleSmallCaveTwice || interestingSmallCave) return;
        interestingSmallCave = position;
    }
    currentPath.push(position);

    if(position === 'end'){
        paths.push(currentPath);
        return;
    }

    let nextPositions = connections.filter(x=>x.includes(position)).map(c => c[0] !== position ? c[0] : c[1]);
    for (const nextPosition of nextPositions.filter(x => x !== 'start')) {
        findPaths(connections, nextPosition, [...currentPath], paths, singleSmallCaveTwice, interestingSmallCave);
    }
    return paths;
}

first();
second();