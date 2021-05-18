const insertionSort = require('./insertionSort');

/* First element is empty or equal to 0 */
const arr = [undefined, 63792301041, 63792579848, 63792579868, 63792579850];

test('insertionSort', () => {
    expect(insertionSort(arr)).toEqual([0, 1, 2, 4, 3]);
});