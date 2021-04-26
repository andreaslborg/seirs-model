let tableRowCounterValue = localStorage.getItem("rowCounter");  
let table = document.getElementById("savedParametersTable");
let tableRows = table.rows.length;

let savedTable = {
    filename: [],
    currentDate: [],
    load: localStorage.getItem("savedTableload"),
    delete: []
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
    let savedTableload = JSON.parse(savedTable.load);
    JSON.parse(savedTable.load).push(savedArr);

    let jsonsavedTableload = JSON.stringify(savedTable.load);
    localStorage.setItem("savedTableload", jsonsavedTableload);
    /*
    let jsonSavedArr = JSON.stringify(savedArr);
    tableRows = table.rows.length;
    savedArrCookieName = "savedArrCookie" + tableRows; console.log(savedArrCookieName);
    savedTable.load.push(jsonSavedArr);
    
    localStorage.setItem(savedArrCookieName, jsonSavedArr);*/
    console.log("Saving successful");
    addNewRow();
}

function addNewRow() {
    /* Finds the table in the html file and filename form */
    let fileForm = document.getElementById("savedName");

    if (tableRows === 1) {
        localStorage.setItem("rowCounter", 1);
    } else {
        localStorage.setItem("rowCounter", parseFloat(localStorage.getItem("rowCounter")) + 1);
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

    savedTable.filename.push(fileName);
    
    localStorage.setItem("fileName1", fileName);

    row1cell1.innerHTML = fileName
    row1cell2.innerHTML = currentDate
    row1cell3.innerHTML = `<button onclick="loadParameters()">Load</button>`;
    row1cell4.innerHTML = `<button onclick="deleteRow()">Delete</button>`; 
    savedTable.filename.push(fileName);
    savedTable.currentDate.push(currentDate);
    redefineRow();
}

function loadParameters(a) {
    tableRows = table.rows.length; // Update the row number.
    let index = a;
    let savedTableload = JSON.parse(savedTable.load);
 
    /* Converts cookie string to float */
    for(i = 0; i < 10; i++) {
        savedTableload[index][i] = parseFloat(savedTableload[index][i])
    }

    S0 = savedTableload[index][0];
    E0 = savedTableload[index][1];
    I0 = savedTableload[index][2];
    R0 = savedTableload[index][3];
    h = savedTableload[index][4];
    beta = savedTableload[index][5];
    gamma = savedTableload[index][6];
    epsilon = savedTableload[index][7];
    sigma = savedTableload[index][8];
    steps = savedTableload[index][9];
    
    console.log("Loading successful");

    setCookieValues();
    setFormSliders();
    rk4sir();
}

function deleteRow(rowNum) {
    tableRows = table.rows.length; // Update the row number.
    /* Removing the row */
    document.getElementById("savedParametersTable").deleteRow(rowNum);
    
    /* Removing the specific cookie 
    let name = "savedArrCookie" + rowNum;
    localStorage.removeItem(name);
    savedArr.splice(0,1);*/

    /* Delete the element in the array, -1 to match the array index */
    let savedTableload = JSON.parse(savedTable.load);

    savedTable.load.splice(rowNum-1,1);
    let jsonsavedTableload = JSON.stringify(savedTable.load);
    localStorage.setItem("savedTableload", jsonsavedTableload);

    localStorage.setItem("rowCounter", parseFloat(localStorage.getItem("rowCounter")) - 1);

    redefineRow();
}

/* When deleting a row, the index changes accordingly */
function redefineRow() {
    tableRows = table.rows.length; // Update the row number.
    console.log("Redefining");
 
    for(i = 1; i < tableRows; i++) {
        table.rows[i].cells[3].innerHTML = `<button onclick="deleteRow(${i})">Delete</button>`;
        table.rows[i].cells[2].innerHTML = `<button onclick="loadParameters(${i})">Load</button>`;
    }


}
/*
for(i = 0; i < savedTable.filename.length; i++) {
    let filenaame = "fileName" + i;
    localStorage.setItem(filenaame, savedTable.filename[i]);
    let datee = "date" + i;
    localStorage.setItem(datee, savedTable.currentDate[i]);
}
*/
function runSavedParameters() {
    
    //JSON.parse(savedTable.load).length
    if(savedTable.load !== null) {
        for(i = 0; i < 10; i++) {
            let newRow = table.insertRow();
            newRow.insertCell(0).innerHTML = "Filename" + i;
            newRow.insertCell(1).innerHTML = "Date" + i;
            newRow.insertCell(2).innerHTML = `<button onclick="loadParameters()">Load</button>`;
            newRow.insertCell(3).innerHTML = `<button onclick="deleteRow()">Delete</button>`;
        }
    }
    redefineRow();
}

runSavedParameters();