let table = document.getElementById("savedParametersTable");

let savedTable = {
    filename: JSON.parse(localStorage.getItem("savedTable.filenameCookie")),
    date: JSON.parse(localStorage.getItem("savedTable.dateCookie")),
    parameters: JSON.parse(localStorage.getItem("savedTable.parametersCookie"))
}

function saveParameters() {
    /* FILENAME */
    /* Finds the table in the html file and filename form */
    let fileForm = document.getElementById("savedName");   

    /* File name */
    let fileName = fileForm.value;
    if (fileName == "") {fileName = "<em>No file name</em>";}

    savedTable.filename.push(fileName);


    /* CURRENT DATE AND TIME */
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    let hour = dateObj.getHours();
    let min = dateObj.getMinutes();
    let sec = dateObj.getSeconds();
    let currentDate = day + "/" + month + "/" + year + " " + hour + ":" + min + ":" + sec;

    savedTable.date.push(currentDate);


    /* GETTING CURRENT PARAMETERS */
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
    
    savedTable.parameters.push(savedArr);

    
    /* STORE/UPDATES COOKIES */
    localStorage.setItem("savedTable.filenameCookie", JSON.stringify(savedTable.filename));
    localStorage.setItem("savedTable.dateCookie", JSON.stringify(savedTable.date));
    localStorage.setItem("savedTable.parametersCookie", JSON.stringify(savedTable.parameters));


    console.log("Saving successful");


    /* CREATING THE NEW TABLE ROW */
    let newRow = table.insertRow();

    /* Defines the new cells spot */
    let row1cell1 = newRow.insertCell(0);
    let row1cell2 = newRow.insertCell(1);
    let row1cell3 = newRow.insertCell(2);
    let row1cell4 = newRow.insertCell(3);

    /* Inputting into the cells */
    row1cell1.innerHTML = fileName;
    row1cell2.innerHTML = currentDate;
    row1cell3.innerHTML = "";           // Button is created in redefineRow()
    row1cell4.innerHTML = "";           // Button is created in redefineRow()

    redefineRow();
}

function loadParameters(rowNum) {
    let savedTableload = JSON.parse(localStorage.getItem("savedTable.parametersCookie"));

    /* Converts cookie string to float */
    for(i = 0; i < savedTableload[rowNum].length; i++) {
        savedTableload[rowNum][i] = parseFloat(savedTableload[rowNum][i])
    }

    S0 = savedTableload[rowNum][0];
    E0 = savedTableload[rowNum][1];
    I0 = savedTableload[rowNum][2];
    R0 = savedTableload[rowNum][3];
    h = savedTableload[rowNum][4];
    beta = savedTableload[rowNum][5];
    gamma = savedTableload[rowNum][6];
    epsilon = savedTableload[rowNum][7];
    sigma = savedTableload[rowNum][8];
    steps = savedTableload[rowNum][9];

    console.log("Loading successful");

    setCookieValues();
    setFormSliders();
    rk4seirs();
}

function deleteRow(rowNum) {
    /* Removing the table row */
    document.getElementById("savedParametersTable").deleteRow(rowNum);

    /* Delete the element in the array */
    let savedTablefilename = JSON.parse(localStorage.getItem("savedTable.filenameCookie"));
    savedTablefilename.splice(rowNum, 1);

    let savedTabledate = JSON.parse(localStorage.getItem("savedTable.dateCookie"));
    savedTabledate.splice(rowNum, 1);

    let savedTableparameters = JSON.parse(localStorage.getItem("savedTable.parametersCookie"));
    savedTableparameters.splice(rowNum, 1);

    /* Update the global object */
    savedTable.filename = savedTablefilename;
    savedTable.date = savedTabledate;
    savedTable.parameters = savedTableparameters;

    /* Update the cookies */
    localStorage.setItem("savedTable.filenameCookie", JSON.stringify(savedTablefilename));
    localStorage.setItem("savedTable.dateCookie", JSON.stringify(savedTabledate));
    localStorage.setItem("savedTable.parametersCookie", JSON.stringify(savedTableparameters));

    redefineRow();
}

/* When deleting a row, the index changes accordingly */
function redefineRow() {
    for(i = 1; i < savedTable.date.length; i++) { 
        table.rows[i].cells[2].innerHTML = `<button onclick="loadParameters(${i})">Load</button>`;
        table.rows[i].cells[3].innerHTML = `<button onclick="deleteRow(${i})">Delete</button>`;
    }
    
    console.log("Redefining successful");
}

function runSavedParameters() {
    let savedTableload = JSON.parse(localStorage.getItem("savedTable.parametersCookie"));

    for(i = 1; i < savedTableload.length; i++) {
        let newRow = table.insertRow();
        newRow.insertCell(0).innerHTML = JSON.parse(localStorage.getItem("savedTable.filenameCookie"))[i];
        newRow.insertCell(1).innerHTML = JSON.parse(localStorage.getItem("savedTable.dateCookie"))[i];
        newRow.insertCell(2).innerHTML = `<button onclick="loadParameters()">Load</button>`;
        newRow.insertCell(3).innerHTML = `<button onclick="deleteRow()">Delete</button>`;
    }

    redefineRow();
}

runSavedParameters();