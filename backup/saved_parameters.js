let tableRowCounterValue = localStorage.getItem("rowCounter");  

let savedTable = {
    filename: ["COVID-19 Denmark", "COVID-19 USA", "COVID-19 England"],
    currentDate: ["21/4/2021 18:8:50", "24/4/2021 14:18:30", "27/5/2021 12:18:30"],
    load: [["199","0","1","0","0.01","2.2","0.3333","0.07142","0.1428","10000"]],
    delete: [32]
};

// Delete item: localStorage.removeItem("name");
function saveParameters() {
    let savedArr = [
        localStorage.getItem("S0Value"),
        localStorage.getItem("E0Value"),
        localStorage.getItem("I0Value"),
        localStorage.getItem("R0Value"),
        localStorage.getItem("stepValue"),
        localStorage.getItem("betaValue"),
        localStorage.getItem("gammaValue"),
        localStorage.getItem("epsilonValue"),
        localStorage.getItem("sigmaValue"),
        localStorage.getItem("totalStepValue")
    ];

    let table = document.getElementById("savedParametersTable");
    let tableRows = table.rows.length;
    let jsonSavedArr = JSON.stringify(savedArr);
    console.log(jsonSavedArr);
    savedArrCookieName = "savedArrCookie" + tableRows;

    savedTable.load.push(savedArr);
    
    localStorage.setItem(savedArrCookieName, jsonSavedArr);
    
    addNewRow();
}

function addNewRow() {
    /* Finds the table in the html file and filename form */
    let table = document.getElementById("savedParametersTable");
    let fileForm = document.getElementById("savedName");

    if (tableRowCounterValue === null) {
        localStorage.setItem("rowCounter", 1);
    } else {
        parseFloat(tableRowCounterValue) + 1;
    }

    /* Inserts a new row */
    let newRow = table.insertRow();

    /* Defines the new cells spot */
    let row1cell1 = newRow.insertCell(0);
    let row1cell2 = newRow.insertCell(1);
    let row1cell3 = newRow.insertCell(2);
    let row1cell4 = newRow.insertCell(3);
    
    /* File name */
    let fileName = fileForm.value;
    if (fileName == "") {fileName = "<em>No file name</em>";}

    /* Date */
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    let hour = dateObj.getHours();
    let min = dateObj.getMinutes();
    let sec = dateObj.getSeconds();
    let currentDate = day + "/" + month + "/" + year + " " + hour + ":" + min + ":" + sec;

    localStorage.setItem("fileName1", fileName);

    row1cell1.innerHTML = fileName
    row1cell2.innerHTML = currentDate
    row1cell3.innerHTML = `<button onclick="loadParameters()">Load</button>`;
    row1cell4.innerHTML = `<button onclick="deleteRow(1)">Delete</button>`; 
    savedTable.filename.push(fileName);
    savedTable.currentDate.push(currentDate);
    redefineRow();
}

function loadParameters(a) {
    let name = "savedArrCookie" + a;
    let jsonSavedArr = localStorage.getItem(name);
    let savedArr = JSON.parse(jsonSavedArr);

    /* Cookie strings to float */
    for(i = 0; i < savedArr.length; i++) {savedArr[i] = parseFloat(savedArr[i])}

    S0 = savedArr[0];
    E0 = savedArr[1];
    I0 = savedArr[2];
    R0 = savedArr[3];
    h = savedArr[4];
    beta = savedArr[5];
    gamma = savedArr[6];
    epsilon = savedArr[7];
    sigma = savedArr[8];
    steps = savedArr[9];
    
    console.log("Loading successful");

    setCookieValues();
    setFormSliders();
    rk4sir();
}

function deleteRow(rowNum) {
    /* Removing the row */
    document.getElementById("savedParametersTable").deleteRow(rowNum);
    
    /* Removing the specific cookie */
    let name = "savedArrCookie" + rowNum;
    localStorage.removeItem(name);
    
    redefineRow();
}

/* When deleting a row, the index changes accordingly */
function redefineRow() {
    console.log("Redefining");
    let table = document.getElementById("savedParametersTable");
    let tableRows = table.rows.length;

    for(i = 1; i < tableRows; i++) {
        table.rows[i].cells[3].innerHTML = `<button onclick="deleteRow(${i})">Delete</button>`;
        table.rows[i].cells[2].innerHTML =   `<button onclick="loadParameters(${i})">Load</button>`;
        
        let name = "savedArrCookie" + i;
        localStorage.setItem(name, savedTable.load[i]);
    }


}

for(i = 0; i < savedTable.filename.length; i++) {
    let filenaame = "fileName" + i;
    localStorage.setItem(filenaame, savedTable.filename[i]);
    let datee = "date" + i;
    localStorage.setItem(datee, savedTable.currentDate[i]);
}

function runSavedParameters() {
    let table = document.getElementById("savedParametersTable");
    let newRow = table.insertRow();
    newRow.insertCell(0).innerHTML = localStorage.getItem("fileName0");
    newRow.insertCell(1).innerHTML = localStorage.getItem("date0");
    newRow.insertCell(2).innerHTML = `<button onclick="loadParameters()">Load</button>`;
    newRow.insertCell(3).innerHTML = `<button onclick="deleteRow()">Delete</button>`;
}

//runSavedParameters();