function insertionSortStrings(inputArr) {
    let indexArr = [];
    for(i = 0; i < inputArr.length; i++)
        indexArr[i] = i;

    let inputArrCopy = [];
    for (i = 0; i < inputArr.length; i++)
        inputArrCopy[i] = inputArr[i];

    // Does not sort first index
    for (i = 2; i < inputArrCopy.length; i++) {
        // Choosing the first element in the unsorted subarray
        let current = inputArrCopy[i];
        let currentIndex = indexArr[i];
        // The last element of the sorted subarray
        let j = i-1;
        while ((j > 0) && (0 < inputArrCopy[j].localeCompare(current, "en", {caseFirst: "upper", ignorePunctuation: "true", numeric: "true"},))) {
            inputArrCopy[j+1] = inputArrCopy[j];
            indexArr[j+1] = indexArr[j];
            j--;
        }
        inputArrCopy[j+1] = current;
        indexArr[j+1] = currentIndex;
    }
    return indexArr;
}

module.exports = insertionSortStrings;