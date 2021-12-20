import { getInput } from '../helpers.js';

function first() {
    const input = getInput(16, false)[0];
    let binary = hex2bin(input);
    console.log(binary);

    let i = 0;
    let versions = 0;
    [versions, i] = addPacketVersions(binary, i);
    console.log(versions, i);

}
function second() {
    const input = getInput(16, false)[0];
    let binary = hex2bin(input);
    console.log(binary);

    let i = 0;
    let values = 0, versions = 0;
    [versions, values, i] = addPacketVersions(binary, i);
    console.log(values, i);
}

function addPacketVersions(packet, i) {
    let version = parseInt(packet.substr(i, 3), 2);
    i += 3;
    let packetTypeId = parseInt(packet.substr(i, 3), 2);
    i += 3;
    console.log(`packet, v:${version}, t:${packetTypeId}`);
    if (packetTypeId == 4) {
        let values = ''
        while (i < packet.length) {
            let value = packet.substr(i, 5);
            values += value.substr(1, 4);
            i += 5;
            if (value[0] == '0') break;
        }
        console.log('values: ' + values, parseInt(values, 2));
        return [version, parseInt(values, 2), i];
    } else {
        let lengthTypeId = parseInt(packet[i], 2);
        i++;
        let versions = [], values = [];
        if (lengthTypeId) {
            let numSubPackets = parseInt(packet.substr(i, 11), 2);
            console.log(`lengthType:${lengthTypeId}, numPackets:${numSubPackets}`);
            i += 11;
            for (let index = 0; index < numSubPackets; index++) {
                let subversion = 0;
                let subValue;
                [subversion, subValue, i] = addPacketVersions(packet, i);
                versions.push(subversion);
                values.push(subValue);
            }
        } else {
            let totalLength = parseInt(packet.substr(i, 15), 2);
            console.log(`lengthType:${lengthTypeId}, totalLength:${totalLength}`);
            i += 15;
            let start = i;
            let subValue;
            while (i - start < totalLength) {
                let subversion = 0;
                [subversion, subValue, i] = addPacketVersions(packet, i);
                versions.push(subversion);
                values.push(subValue);
            }
        }
        let finalValue = 0;
        switch (packetTypeId) {
            case 0:
                finalValue = values.reduce((acc, curr) => acc + curr, 0);
                break;
            case 1:
                finalValue = values.reduce((acc, curr) => acc * curr, 1);
                break;
            case 2:
                finalValue = Math.min(...values);
                break;
            case 3:
                finalValue = Math.max(...values);
                break;
            case 5:
                finalValue = values[0] > values[1] ? 1 : 0;
                break;
            case 6:
                finalValue = values[0] < values[1] ? 1 : 0;
                break;
            case 7:
                finalValue = values[0] == values[1] ? 1 : 0;
                break;
            default:
                break;
        }

        let versionSum = versions.reduce((acc, curr) => acc + curr, 0);
        return [version + versionSum, finalValue, i];
    }
}

//first();
second();

function hex2bin(hex) {
    return hex.split('').map(x => parseInt(x, 16).toString(2).padStart(4, '0')).join('');
    //return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}