const fs = require('fs');

const file = 'e:\\PEGASUS\\pps-raharjo\\src\\components\\PublicPages.tsx';
const original = 'original_block.tsx';

let lines = fs.readFileSync(file, 'utf8').split('\n');
const origLines = fs.readFileSync(original, 'utf8').split('\n');

// Find where BerandaView News Grid starts (the end of the filter tabs)
const startIdx = lines.findIndex(l => l.includes('id={`filter-tab-${unit.key.toLowerCase().replace(/\\s+/g, \'-\')}`}')) + 5;

// Find the end of BerandaView
let endIdx = -1;
for (let i = startIdx; i < lines.length; i++) {
    if (lines[i].includes('function PublikasiView(')) {
        endIdx = i - 3; // go a bit up to keep the comment lines
        break;
    }
}

console.log('Replacing from line', startIdx, 'to', endIdx);
lines.splice(startIdx, endIdx - startIdx, ...origLines);

fs.writeFileSync(file, lines.join('\n'));
console.log('Restored BerandaView successfully.');
