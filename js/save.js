const YEAR = 31557600;
const MONTH = 2628288;
const DAY = 86400;
const HOUR = 3600;
const MINUTE = 60;

let table = document.getElementById("savedParametersTable");

/* Arrays for holding the saved data */
let filenameArr = JSON.parse(localStorage.getItem("filenameArrCookie")),
    dateArr = JSON.parse(localStorage.getItem("dateArrCookie")),
    peakInfArr = JSON.parse(localStorage.getItem("peakInfArrCookie")),
    peakExpArr = JSON.parse(localStorage.getItem("peakExpArrCookie")),
    parametersArr = JSON.parse(localStorage.getItem("parametersArrCookie"));

function saveParameters() {
    blackArrows();
    /* FILENAME */
    /* Finds the table in the html file and filename form */
    let fileForm = document.getElementById("savedName");   

    /* File name */
    let fileName = fileForm.value;
    if (fileName == "") {fileName = "<em>No file name</em>";}

    filenameArr.push(fileName);

    /* CURRENT DATE AND TIME */
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;     if (month < 10) {month = "0" + month;}
    let day = dateObj.getDate();            if (day < 10) {day = "0" + day;}
    let hour = dateObj.getHours();          if (hour < 10) {hour = "0" + hour;}
    let min = dateObj.getMinutes();         if (min < 10) {min = "0" + min;} 
    let sec = dateObj.getSeconds();         if (sec < 10) {sec = "0" + sec;}   

    let currentDate = day + "/" + month + "/" + year + " " + hour + ":" + min + ":" + sec;

    dateArr.push(currentDate);


    /* GETTING CURRENT PARAMETERS */
    let savedArr = [
        localStorage.getItem("checkboxFixPopValue"),
        localStorage.getItem("S0Value"),
        localStorage.getItem("E0Value"),
        localStorage.getItem("I0Value"),
        localStorage.getItem("R0Value"),
        localStorage.getItem("betaValue"),
        localStorage.getItem("gammaValue"),
        localStorage.getItem("epsilonValue"),
        localStorage.getItem("sigmaValue"),
        localStorage.getItem("daysValue")
    ];
    
    parametersArr.push(savedArr);

    /* Store peak infected */
    peakInfArr.push(peakInfPercent);

    /* Store peak exposed */
    peakExpArr.push(peakExpPercent);

    
    /* STORE/UPDATES COOKIES */
    localStorage.setItem("filenameArrCookie", JSON.stringify(filenameArr));
    localStorage.setItem("dateArrCookie", JSON.stringify(dateArr));
    localStorage.setItem("peakInfArrCookie", JSON.stringify(peakInfArr));
    localStorage.setItem("peakExpArrCookie", JSON.stringify(peakExpArr));
    localStorage.setItem("parametersArrCookie", JSON.stringify(parametersArr));


    console.log("Saving parameters.");


    /* CREATING THE NEW TABLE ROW */
    let newRow = table.insertRow();

    /* Defines the new cells spot */
    let row1cell1 = newRow.insertCell(0);
    let row1cell2 = newRow.insertCell(1);
    let row1cell3 = newRow.insertCell(2);
    let row1cell4 = newRow.insertCell(3);
    let row1cell5 = newRow.insertCell(4);
    let row1cell6 = newRow.insertCell(5);

    /* Inputting into the cells */
    row1cell1.innerHTML = fileName;
    row1cell2.innerHTML = currentDate;
    row1cell3.innerHTML = peakInfPercent;
    row1cell4.innerHTML = peakExpPercent;
    row1cell5.innerHTML = "";           // Button is created in redefineRow()
    row1cell6.innerHTML = "";           // Button is created in redefineRow()

    redefineRow();
}

function loadParameters(rowNum) {
    let savedTableload = JSON.parse(localStorage.getItem("parametersArrCookie"));

    /* Converts cookie string to float */
    for(i = 0; i < savedTableload[rowNum].length; i++) {
        savedTableload[rowNum][i] = parseFloat(savedTableload[rowNum][i])
    }

    checkboxFixPop.checked = savedTableload[rowNum][0];
    S0 = savedTableload[rowNum][1];
    E0 = savedTableload[rowNum][2];
    I0 = savedTableload[rowNum][3];
    R0 = savedTableload[rowNum][4];
    beta = savedTableload[rowNum][5];
    gamma = savedTableload[rowNum][6];
    epsilon = savedTableload[rowNum][7];
    sigma = savedTableload[rowNum][8];
    days = savedTableload[rowNum][9];

    console.log("Loading " + rowNum + ".");

    setCookieValues();
    setFormSliders();
    rk4seirs();
}

function deleteRow(rowNum) {
    /* Removing the table row */
    table.deleteRow(rowNum);

    /* Delete the element in the array */
    let filenameArrNew = JSON.parse(localStorage.getItem("filenameArrCookie"));
    filenameArrNew.splice(rowNum, 1);

    let dateArrNew = JSON.parse(localStorage.getItem("dateArrCookie"));
    dateArrNew.splice(rowNum, 1);

    let peakInfArrNew = JSON.parse(localStorage.getItem("peakInfArrCookie"));
    peakInfArrNew.splice(rowNum, 1);

    let peakExpArrNew = JSON.parse(localStorage.getItem("peakExpArrCookie"));
    peakExpArrNew.splice(rowNum, 1);

    let parametersArrNew = JSON.parse(localStorage.getItem("parametersArrCookie"));
    parametersArrNew.splice(rowNum, 1);

    /* Update the arrays */
    filenameArr = filenameArrNew;
    dateArr = dateArrNew;
    peakInfArr = peakInfArrNew;
    peakExpArr = peakExpArrNew;
    parametersArr = parametersArrNew;

    /* Update the cookies */
    localStorage.setItem("filenameArrCookie", JSON.stringify(filenameArrNew));
    localStorage.setItem("dateArrCookie", JSON.stringify(dateArrNew));
    localStorage.setItem("peakInfArrCookie", JSON.stringify(peakInfArrNew));
    localStorage.setItem("peakExpArrCookie", JSON.stringify(peakExpArrNew));
    localStorage.setItem("parametersArrCookie", JSON.stringify(parametersArrNew));

    console.log("Deleted row " + rowNum + ".")
    redefineRow();
}

/* When deleting a row, the index changes accordingly */
function redefineRow() {
    for(i = 1; i < dateArr.length; i++) { 
        table.rows[i].cells[4].innerHTML = `<button onclick="loadParameters(${i})">Load</button>`;
        table.rows[i].cells[5].innerHTML = `<button onclick="deleteRow(${i})">Delete</button>`;
    }
    console.log("Redefining rows.");
}

/* Loading the saved parameters when the website is opened */
function runSavedParameters() {
    for (i = 1; i < peakExpArr.length; i++) {
        let newRow = table.insertRow();

        newRow.insertCell(0).innerHTML = JSON.parse(localStorage.getItem("filenameArrCookie"))[i];
        newRow.insertCell(1).innerHTML = JSON.parse(localStorage.getItem("dateArrCookie"))[i];
        newRow.insertCell(2).innerHTML = JSON.parse(localStorage.getItem("peakInfArrCookie"))[i];
        newRow.insertCell(3).innerHTML = JSON.parse(localStorage.getItem("peakExpArrCookie"))[i];
        newRow.insertCell(4).innerHTML = `<button onclick="loadParameters()">Load</button>`;
        newRow.insertCell(5).innerHTML = `<button onclick="deleteRow()">Delete</button>`;
    }
    redefineRow();
}

runSavedParameters();

/* Creating the CSV file when the button is pressed */
function saveCSV() {
    console.log("Saving CSV file.")

    let csvContent = [tArr, dataS, dataE, dataI, dataR];
    let csvRows = ["Time,Susceptible,Exposed,Infected,Removed\r"];

    for (let i = 0; i < tArr.length; i++) {
        for (let j = 0; j < csvContent.length; j++) {
            if(j == csvContent.length - 1) {csvRows.push(csvContent[j][i]);}
            else {csvRows.push(csvContent[j][i] + ",");}
        }
        csvRows.push("\r"); // New row (Carriage Return)
    }

    /* Getting current date */
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;     if (month < 10) {month = "0" + month;}
    let day = dateObj.getDate();            if (day < 10) {day = "0" + day;}
    let hour = dateObj.getHours();          if (hour < 10) {hour = "0" + hour;}
    let min = dateObj.getMinutes();         if (min < 10) {min = "0" + min;} 

    let currentDate = day + "" + month + "" + year + "_" + hour + "" + min;

    /* Creating the CSV file */
    let csvString = csvRows.join("");
    let a         = document.createElement("a");
    a.href        = "data:attachment/csv," +  encodeURIComponent(csvString);
    a.target      = "_blank";
    a.download    = "seirs_data_"+ currentDate + ".csv";

    document.body.appendChild(a);
    a.click();
}

/* ARROWS AND SORTING */
let nameArrow = document.getElementById("nameArrow");
let dateArrow = document.getElementById("dateArrow");
let infArrow = document.getElementById("infArrow");
let expArrow = document.getElementById("expArrow");

/* Set the correct arrows when website is loaded */
nameArrow.style.color = localStorage.getItem("nameArrow")
dateArrow.style.color = localStorage.getItem("dateArrow");
infArrow.style.color = localStorage.getItem("infArrow");
expArrow.style.color = localStorage.getItem("expArrow");

function blackArrows() {
    nameArrow.style.color = "black";
    dateArrow.style.color = "black";
    infArrow.style.color = "black";
    expArrow.style.color = "black";
    localStorage.setItem("nameArrow", "black");
    localStorage.setItem("dateArrow", "black");
    localStorage.setItem("infArrow", "black");
    localStorage.setItem("expArrow", "black");
}

function changeArrow(arrowName) {
    blackArrows();

    localStorage.setItem(`${arrowName.id}`, "blue");
    arrowName.style.color = "blue";
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