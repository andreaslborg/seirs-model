let table = document.getElementById("savedParametersTable"),
    fileForm = document.getElementById("savedName"),
    fileName,
    date,
    parameters = [],
    filenameArr = JSON.parse(localStorage.getItem("filenameArrCookie")),
    dateArr = JSON.parse(localStorage.getItem("dateArrCookie")),
    peakInfArr = JSON.parse(localStorage.getItem("peakInfArrCookie")),
    peakExpArr = JSON.parse(localStorage.getItem("peakExpArrCookie")),
    parametersArr = JSON.parse(localStorage.getItem("parametersArrCookie"));

// Saves current parameters into arrays    
function saveParameters() {
    allBlackArrows();

    fileName = fileFormName();
    date = currentDate();
    parameters = currentParameters();

    filenameArr.push(fileName);
    dateArr.push(date);
    parametersArr.push(parameters);
    peakInfArr.push(peakInfPercent);
    peakExpArr.push(peakExpPercent);

    updateArrCookies(filenameArr, dateArr, parametersArr, peakInfArr, peakExpArr);
    addRow();    
    redefineRow();
}

// Returns filename from text input field 
function fileFormName() {
    let currentFileName = fileForm.value;

    if (currentFileName == "")
        currentFileName = "<em>No file name</em>";

    return currentFileName;
}

// Returns the current date and time
function currentDate() {
    let dateObj = new Date(),
        year = dateObj.getFullYear(),
        month = dateObj.getMonth() + 1,
        day = dateObj.getDate(),
        hour = dateObj.getHours(),
        min = dateObj.getMinutes(),      
        sec = dateObj.getSeconds();
        
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    if (hour < 10)
        hour = "0" + hour;
    if (min < 10)
        min = "0" + min; 
    if (sec < 10)
        sec = "0" + sec;
    
    let currentDateTime = day + "/" + month + "/" + year + " " + hour + ":" + min + ":" + sec;

    return currentDateTime;
}

// Returns array with current parameters
function currentParameters() {
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

    return savedArr;
}

// Stores/updates cookies
function updateArrCookies(filenameArr, dateArr, parametersArr, peakInfArr, peakExpArr) {
    localStorage.setItem("filenameArrCookie", JSON.stringify(filenameArr));
    localStorage.setItem("dateArrCookie", JSON.stringify(dateArr));
    localStorage.setItem("parametersArrCookie", JSON.stringify(parametersArr));
    localStorage.setItem("peakInfArrCookie", JSON.stringify(peakInfArr));
    localStorage.setItem("peakExpArrCookie", JSON.stringify(peakExpArr));
}

// Adds a new row to the table
function addRow() {
    let newRow = table.insertRow();

    newRow.insertCell(0).innerHTML = fileName;
    newRow.insertCell(1).innerHTML = date;
    newRow.insertCell(2).innerHTML = peakInfPercent;
    newRow.insertCell(3).innerHTML = peakExpPercent;
    newRow.insertCell(4).innerHTML = "";           // Button is created in redefineRow()
    newRow.insertCell(5).innerHTML = "";           // Button is created in redefineRow()
}

// Deletes a row from the table
function deleteRow(rowNum) {
    table.deleteRow(rowNum);

    filenameArr.splice(rowNum, 1);
    dateArr.splice(rowNum, 1);
    peakInfArr.splice(rowNum, 1);
    peakExpArr.splice(rowNum, 1);
    parametersArr.splice(rowNum, 1);

    updateArrCookies(filenameArr, dateArr, parametersArr, peakInfArr, peakExpArr);
    redefineRow();
}

// When deleting a row, the index changes accordingly
function redefineRow() {
    for (i = 1; i < dateArr.length; i++) { 
        table.rows[i].cells[4].innerHTML = `<button onclick="loadParameters(${i})">Load</button>`;
        table.rows[i].cells[5].innerHTML = `<button onclick="deleteRow(${i})">Delete</button>`;
    }
}

// Loads the parameters according to the row number
function loadParameters(rowNum) {
    let savedTableload = JSON.parse(localStorage.getItem("parametersArrCookie"));

    for (i = 0; i < savedTableload[rowNum].length; i++) {
        savedTableload[rowNum][i] = parseFloat(savedTableload[rowNum][i])
    }

    checkboxFixPopValue = savedTableload[rowNum][0];
    S0 = savedTableload[rowNum][1];
    E0 = savedTableload[rowNum][2];
    I0 = savedTableload[rowNum][3];
    R0 = savedTableload[rowNum][4];
    beta = savedTableload[rowNum][5];
    gamma = savedTableload[rowNum][6];
    epsilon = savedTableload[rowNum][7];
    sigma = savedTableload[rowNum][8];
    days = savedTableload[rowNum][9];
    
    setCookieValues();

    updateParameters();
    runGraph();
}

// Loads the saved parameters when the website is opened
function runSavedParameters() {
    for (i = 1; i < peakExpArr.length; i++) {
        let newRow = table.insertRow();

        newRow.insertCell(0).innerHTML = JSON.parse(localStorage.getItem("filenameArrCookie"))[i];
        newRow.insertCell(1).innerHTML = JSON.parse(localStorage.getItem("dateArrCookie"))[i];
        newRow.insertCell(2).innerHTML = JSON.parse(localStorage.getItem("peakInfArrCookie"))[i];
        newRow.insertCell(3).innerHTML = JSON.parse(localStorage.getItem("peakExpArrCookie"))[i];
        newRow.insertCell(4).innerHTML = ``;
        newRow.insertCell(5).innerHTML = ``;
    }
    redefineRow();
}

// Creates a CSV file when the button is pressed 
function saveCSV() {
    let csvContent = [tArr, dataS, dataE, dataI, dataR], 
        csvRows = ["Time,Susceptible,Exposed,Infected,Removed\r"],
        csvString = csvRows.join(""), 
        csvFile = document.createElement("a");

    for (let i = 0; i < tArr.length; i++) {
        for (let j = 0; j < csvContent.length; j++) {
            if (j == csvContent.length - 1) {
                csvRows.push(csvContent[j][i]);
            }
            else {
                csvRows.push(csvContent[j][i] + ",");
            }
        }
        csvRows.push("\r");
    }

    csvFile.href = "data:attachment/csv," +  encodeURIComponent(csvString);
    csvFile.target = "_blank";
    csvFile.download = "seirs_data_"+ currentDate() + ".csv";

    document.body.appendChild(csvFile);
    csvFile.click();
}