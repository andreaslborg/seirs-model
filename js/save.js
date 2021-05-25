let table = document.getElementById("savedParametersTable"),
    fileForm = document.getElementById("savedName"),
    fileName,
    date,
    parameters = [];
    
// Saves current parameters into arrays  
function saveParameters() {
    colorArrowsBlack();

    fileName = fileFormName();
    date = currentDate();
    parameters = currentParameters();

    saveObj.filenameArr.push(fileName);
    saveObj.dateArr.push(date);
    saveObj.parametersArr.push(parameters);
    saveObj.peakInfArr.push(peakInfPercent);
    saveObj.peakExpArr.push(peakExpPercent);

    updateArrCookies(saveObj.filenameArr, saveObj.dateArr, saveObj.parametersArr, saveObj.peakInfArr, saveObj.peakExpArr);
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

    saveObj.filenameArr.splice(rowNum, 1);
    saveObj.dateArr.splice(rowNum, 1);
    saveObj.peakInfArr.splice(rowNum, 1);
    saveObj.peakExpArr.splice(rowNum, 1);
    saveObj.parametersArr.splice(rowNum, 1);

    updateArrCookies(saveObj.filenameArr, saveObj.dateArr, saveObj.parametersArr, saveObj.peakInfArr, saveObj.peakExpArr);
    redefineRow();
}

// When deleting a row, the index changes accordingly
function redefineRow() {
    for (i = 1; i < JSON.parse(localStorage.getItem("filenameArrCookie")).length; i++) { 
        table.rows[i].cells[4].innerHTML = `<button onclick="loadParameters(${i})" class="loadButton">Load</button>`;
        table.rows[i].cells[5].innerHTML = `<button onclick="deleteRow(${i})" class="deleteButton">Delete</button>`;
    }
}

// Loads the parameters according to the row number
function loadParameters(rowNum) {
    let savedTableload = JSON.parse(localStorage.getItem("parametersArrCookie"));

    for (i = 0; i < savedTableload[rowNum].length; i++) {
        savedTableload[rowNum][i] = parseFloat(savedTableload[rowNum][i])
    }

    parameterObj.checkboxFixPopValue = savedTableload[rowNum][0];
    parameterObj.S0 = savedTableload[rowNum][1];
    parameterObj.E0 = savedTableload[rowNum][2];
    parameterObj.I0 = savedTableload[rowNum][3];
    parameterObj.R0 = savedTableload[rowNum][4];
    parameterObj.beta = savedTableload[rowNum][5];
    parameterObj.gamma = savedTableload[rowNum][6];
    parameterObj.epsilon = savedTableload[rowNum][7];
    parameterObj.sigma = savedTableload[rowNum][8];
    parameterObj.days = savedTableload[rowNum][9];
    
    setCookieValues();
    updateParameters();
    runGraph();
}

// Loads the saved parameters when the website is opened
function runSavedParameters() {
    for (i = 1; i < JSON.parse(localStorage.getItem("filenameArrCookie")).length; i++) {
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
    let csvContent = [dataObj.tArr, dataObj.dataS, dataObj.dataE, dataObj.dataI, dataObj.dataR], 
        csvRows = ["Time,Susceptible,Exposed,Infected,Removed\r"];
        
    for (i = 0; i < dataObj.tArr.length; i++) {
        for (j = 0; j < csvContent.length; j++) {
            if (j == csvContent.length - 1)
                csvRows.push(csvContent[j][i]);
            else
                csvRows.push(csvContent[j][i] + ",");
        }
        csvRows.push("\r");
    }

    let csvString = csvRows.join(""), 
        a = document.createElement("a");
    
    a.href = "data:attachment/csv," +  encodeURIComponent(csvString);
    a.target = "_blank";
    a.download = "seirs_data " + currentDate() + ".csv";

    document.body.appendChild(a);
    a.click();
}