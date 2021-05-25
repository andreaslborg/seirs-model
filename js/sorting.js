const YEAR = 31557600,
      MONTH = 2628288,
      DAY = 86400,
      HOUR = 3600,
      MINUTE = 60;

// Arrows for sorting
let nameArrow = document.getElementById("nameArrow"),
    dateArrow = document.getElementById("dateArrow"),
    infArrow = document.getElementById("infArrow"),
    expArrow = document.getElementById("expArrow");

// Colors the arrows in the table black
function colorArrowsBlack() {
    nameArrow.style.color = "black";
    dateArrow.style.color = "black";
    infArrow.style.color = "black";
    expArrow.style.color = "black";
    localStorage.setItem("nameArrow", "black");
    localStorage.setItem("dateArrow", "black");
    localStorage.setItem("infArrow", "black");
    localStorage.setItem("expArrow", "black");
}

// Sets the correct arrows when website is loaded
function arrowsColorCookies() {
    nameArrow.style.color = localStorage.getItem("nameArrow");
    dateArrow.style.color = localStorage.getItem("dateArrow");
    infArrow.style.color = localStorage.getItem("infArrow");
    expArrow.style.color = localStorage.getItem("expArrow");
}

// Sets the color of an arrow to blue
function changeArrow(arrowName) {
    colorArrowsBlack();

    arrowName.style.color = "blue";
    localStorage.setItem(`${arrowName.id}`, "blue");
}

// Deletes the table rows and prints the new, sorted table rows
function resetRows(arrLength) {
    for (i = 1; i < arrLength; i++) {
        table.deleteRow(1);
    }
    runSavedParameters();
}

// Sorts the arrays of the table in the order of indexArr
function sortingOrder(indexArr) {
    let filenameArrNew = [0],
        dateArrNew = [0],
        peakInfArrNew = [0],
        peakExpArrNew = [0],
        parametersArrNew = [0];

    for(i = 1; i < indexArr.length; i++) {
        filenameArrNew[i] = saveObj.filenameArr[indexArr[i]];
        dateArrNew[i] = saveObj.dateArr[indexArr[i]];
        peakInfArrNew[i] = saveObj.peakInfArr[indexArr[i]];
        peakExpArrNew[i] = saveObj.peakExpArr[indexArr[i]];
        parametersArrNew[i] = saveObj.parametersArr[indexArr[i]];
    }

    saveObj.filenameArr = filenameArrNew;
    saveObj.dateArr = dateArrNew;
    saveObj.peakInfArr = peakInfArrNew;
    saveObj.peakExpArr = peakExpArrNew;
    saveObj.parametersArr = parametersArrNew;

    localStorage.setItem("filenameArrCookie", JSON.stringify(filenameArrNew));
    localStorage.setItem("dateArrCookie", JSON.stringify(dateArrNew));
    localStorage.setItem("peakInfArrCookie", JSON.stringify(peakInfArrNew));
    localStorage.setItem("peakExpArrCookie", JSON.stringify(peakExpArrNew));
    localStorage.setItem("parametersArrCookie", JSON.stringify(parametersArrNew));
}

// Creates an array with the indexes of the sorting order of the input from lowest to highest value
function insertionSort(inputArr) {
    let indexArr = [];
    for(i = 0; i < inputArr.length; i++)
        indexArr[i] = i;

    let inputArrCopy = [];
    for (i = 0; i < inputArr.length; i++)
        inputArrCopy[i] = parseFloat(inputArr[i]);

    // Does not sort first index
    for (i = 2; i < inputArrCopy.length; i++) {
        let current = inputArrCopy[i],
            currentIndex = indexArr[i],
            j = i-1;
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

// Creates an array with the indexes of the lexicographical sorting order of the input
function insertionSortStrings(inputArr) {
    let indexArr = [];
    for(i = 0; i < inputArr.length; i++)
        indexArr[i] = i;

    let inputArrCopy = [];
    for (i = 0; i < inputArr.length; i++)
        inputArrCopy[i] = inputArr[i];

    // Does not sort first index
    for (i = 2; i < inputArrCopy.length; i++) {
        let current = inputArrCopy[i],
            currentIndex = indexArr[i],
            j = i-1;
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

// Converts an array of dates into seconds
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
    sortingOrder(insertionSortStrings(saveObj.filenameArr));
    resetRows(saveObj.filenameArr.length);
}

dateArrow.onclick = function() {
    changeArrow(dateArrow);
    sortingOrder(insertionSort(dateToInt(saveObj.dateArr)));
    resetRows(saveObj.dateArr.length);
}

infArrow.onclick = function() {
    changeArrow(infArrow);
    sortingOrder(insertionSort(saveObj.peakInfArr));
    resetRows(saveObj.peakInfArr.length);
}

expArrow.onclick = function() {    
    changeArrow(expArrow);
    sortingOrder(insertionSort(saveObj.peakExpArr));
    resetRows(saveObj.peakExpArr.length);
}