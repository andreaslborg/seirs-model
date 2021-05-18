const insertionSortStrings = require('./insertionSortStrings');

/* First element is empty or equal to 0 */
const arr = [0, "a", "d", "f", "x", "c", "b"];

test('insertionSort', () => {
    expect(insertionSortStrings(arr)).toEqual([0, 1, 6, 5, 2, 3, 4]);
});