const resizeArr = require('./resizeArr.js');

let dataOver100 = [];
for(i=0; i < 534000;i++) {
    dataOver100[i] = i;
}

let dataUnder100 = [];
for(i=0; i < 50;i++) {
    dataUnder100[i] = i;
}

let newdataOver = resizeArr(dataOver100);
let newdataUnder = resizeArr(dataUnder100);

test('resize arr', () => {
    expect(newdataOver.length).toBe(100);
    expect(newdataUnder.length).toBe(dataUnder100.length);
})