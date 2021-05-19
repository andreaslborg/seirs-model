const insertionSort = require('./insertionSort');

/* First element is undefined or equal to 0 */
const arr = [undefined, 63792579848, 63792579868, 63792579850, 63792301041];

test('insertionSort', () => {
    expect(insertionSort(arr)).toEqual([0, 4, 1, 3, 2]);
});