const YEAR = 31557600;
const MONTH = 2628288;
const DAY = 86400;
const HOUR = 3600;
const MINUTE = 60;

// Arrows for sorting
let nameArrow = document.getElementById("nameArrow");
let dateArrow = document.getElementById("dateArrow");
let infArrow = document.getElementById("infArrow");
let expArrow = document.getElementById("expArrow");

// Colors the arrows in the table black
function allBlackArrows() {
    nameArrow.style.color = "black";
    dateArrow.style.color = "black";
    infArrow.style.color = "black";
    expArrow.style.color = "black";
    localStorage.setItem("nameArrow", "black");
    localStorage.setItem("dateArrow", "black");
    localStorage.setItem("infArrow", "black");
    localStorage.setItem("expArrow", "black");
}

// Set the correct arrows when website is loaded
function arrowsColorCookies() {
    nameArrow.style.color = localStorage.getItem("nameArrow");
    dateArrow.style.color = localStorage.getItem("dateArrow");
    infArrow.style.color = localStorage.getItem("infArrow");
    expArrow.style.color = localStorage.getItem("expArrow");
}

function changeArrow(arrowName) {
    allBlackArrows();

    arrowName.style.color = "blue";
    localStorage.setItem(`${arrowName.id}`, "blue");
}

function resetRows(arrLength) {
    for (i = 1; i < arrLength; i++) {
        table.deleteRow(1);
    }
    runSavedParameters();
}

function sortingOrder(indexArr) {
    let filenameArrNew = [0],
        dateArrNew = [0],
        peakInfArrNew = [0],
        peakExpArrNew = [0],
        parametersArrNew = [0];

    for(i = 1; i < indexArr.length; i++) {
        filenameArrNew[i] = filenameArr[indexArr[i]];
        dateArrNew[i] = dateArr[indexArr[i]];
        peakInfArrNew[i] = peakInfArr[indexArr[i]];
        peakExpArrNew[i] = peakExpArr[indexArr[i]];
        parametersArrNew[i] = parametersArr[indexArr[i]];
    }

    // Update arrays
    filenameArr = filenameArrNew;
    dateArr = dateArrNew;
    peakInfArr = peakInfArrNew;
    peakExpArr = peakExpArrNew;
    parametersArr = parametersArrNew;

    // Update cookies
    localStorage.setItem("filenameArrCookie", JSON.stringify(filenameArrNew));
    localStorage.setItem("dateArrCookie", JSON.stringify(dateArrNew));
    localStorage.setItem("peakInfArrCookie", JSON.stringify(peakInfArrNew));
    localStorage.setItem("peakExpArrCookie", JSON.stringify(peakExpArrNew));
    localStorage.setItem("parametersArrCookie", JSON.stringify(parametersArrNew));
}

function insertionSort(inputArr) {
    let indexArr = [];
    for(i = 0; i < inputArr.length; i++)
        indexArr[i] = i;

    let inputArrCopy = [];
    for (i = 0; i < inputArr.length; i++)
        inputArrCopy[i] = parseFloat(inputArr[i]);

    // Does not sort first index
    for (i = 2; i < inputArrCopy.length; i++) {
        // Choosing the first element in the unsorted subarray
        let current = inputArrCopy[i];
        let currentIndex = indexArr[i];
        // The last element of the sorted subarray
        let j = i-1;
        while ((j > 0) && (current < inputArrCopy[j])) {
            inputArrCopy[j+1] = inputArrCopy[j];
            indexArr[j+1] = indexArr[j];
            j--;
        }
        inputArrCopy[j+1] = current;
        indexArr[j+1] = currentIndex;
    }
    return indexArr;
}

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

function dateToInt(inputArr) {
    let floatArr = [];

    for (i = 1; i < inputArr.length; i++) {
        floatArr[i] = parseInt(inputArr[i].slice(6,10))*YEAR + 
                      parseInt(inputArr[i].slice(3,5))*MONTH + 
                      parseInt(inputArr[i].slice(0,2))*DAY + 
                      parseInt(inputArr[i].slice(11,13))*HOUR + 
                      parseInt(inputArr[i].slice(14,16))*MINUTE + 
                      parseInt(inputArr[i].slice(17,19));
    }
    return floatArr;
}

nameArrow.onclick = function() {
    changeArrow(nameArrow);
    sortingOrder(insertionSortStrings(filenameArr));
    resetRows(filenameArr.length);
}

dateArrow.onclick = function() {
    changeArrow(dateArrow);
    sortingOrder(insertionSort(dateToInt(dateArr)));
    resetRows(dateArr.length);
}

infArrow.onclick = function() {
    changeArrow(infArrow);
    sortingOrder(insertionSort(peakInfArr));
    resetRows(peakInfArr.length);
}

expArrow.onclick = function() {    
    changeArrow(expArrow);
    sortingOrder(insertionSort(peakExpArr));
    resetRows(peakExpArr.length);
}