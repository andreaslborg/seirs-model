let tableRowCounterValue = localStorage.getItem("rowCounter");  

function saveParameters() {
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

    /* Sets the values into the cells */
    localStorage.setItem("fileName1", fileName);
    row1cell1.innerHTML = fileName;
    row1cell2.innerHTML = currentDate;
    row1cell3.innerHTML = `<button>Load</button>`;
    row1cell4.innerHTML = "Tom";

    redefineRow();
}

function deleteRow(a) {
    document.getElementById("savedParametersTable").deleteRow(a);
    
    redefineRow();
}

/* When deleting a row, the index changes accordingly */
function redefineRow() {
    console.log("redefining");
    let table = document.getElementById("savedParametersTable");
    let tableRows = table.rows.length;

    for(i = 1; i < tableRows; i++) {
        table.rows[i].cells[3].innerHTML = `<button onclick="deleteRow(${i})">Delete</button>`;
    }
}

let savedTable = {
    filename: [123, 23984, 203],
    currentDate: [12],
    load: [2],
    delete: [32]
};

console.log(savedTable.filename[1]);

function runSavedParameters() {
    let table = document.getElementById("savedParametersTable");
    let newRow = table.insertRow();
    newRow.insertCell(0).innerHTML = localStorage.getItem("fileName1");
    newRow.insertCell(1).innerHTML = "Cell2";
    newRow.insertCell(2).innerHTML = "Cell3";
    newRow.insertCell(3).innerHTML = "Cell4";
}

runSavedParameters();