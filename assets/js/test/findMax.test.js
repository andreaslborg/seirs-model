const findMax = require('./findMax');

const arr = [7, 18, 6, 12, 15, 1, -3];

test('find max number', () => {
    expect(findMax(arr)).toBe(18);
});