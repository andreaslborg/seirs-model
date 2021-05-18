const rk4 = require('./rk4.js');

const h = 0.01, totalSteps = 10;

let dataTest = rk4();

// Correct data
let TestCorrectArr = [1];
for (i = 1; i <= totalSteps; i++) {
    TestCorrectArr[i] = Math.exp(h*i);
}

test('rk4seirs', () => {
    for(i=0; i < TestCorrectArr.length; i++){
    expect(dataTest[i]).toBeCloseTo(TestCorrectArr[i], 10); // 10 is decimal precision
    }
});
