let table = document.getElementById("savedParametersTable");

/* Arrays for holding the saved data */
let filenameArr = JSON.parse(localStorage.getItem("filenameArrCookie")),
    dateArr = JSON.parse(localStorage.getItem("dateArrCookie")),
    peakInfArr = JSON.parse(localStorage.getItem("peakInfArrCookie")),
    peakExpArr = JSON.parse(localStorage.getItem("peakExpArrCookie")),
    parametersArr = JSON.parse(localStorage.getItem("parametersArrCookie"));

function saveParameters() {
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
        localStorage.getItem("totalStepValue")
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
    document.getElementById("savedParametersTable").deleteRow(rowNum);

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
    let savedTableload = JSON.parse(localStorage.getItem("parametersArrCookie"));

    for(i = 1; i < savedTableload.length; i++) {
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

    for(let i = 0; i < tArr.length; i++) {
        for(let j = 0; j < csvContent.length; j++) {
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
    let a         = document.createElement('a');
    a.href        = 'data:attachment/csv,' +  encodeURIComponent(csvString);
    a.target      = '_blank';
    a.download    = "seirs_data_"+ currentDate + '.csv';

    document.body.appendChild(a);
    a.click();
}

/* ARROWS AND SORTING */
let nameArrow = document.getElementById("nameArrow");
let dateArrow = document.getElementById("dateArrow");
let infArrow = document.getElementById("infArrow");
let expArrow = document.getElementById("expArrow");

/* Set the correct arrows when website is loaded */
nameArrow.innerHTML = localStorage.getItem("nameArrow")
dateArrow.innerHTML = localStorage.getItem("dateArrow");
infArrow.innerHTML = localStorage.getItem("infArrow");
expArrow.innerHTML = localStorage.getItem("expArrow");

function changeArrow(arrowName) {
    if (arrowName.innerHTML == "▼") { 
        arrowName.innerHTML = "▲"; 
        /* Update the cookie value */
        localStorage.setItem(`${arrowName.id}`, "▲");
    } else { 
        arrowName.innerHTML = "▼"; 
        /* Update the cookie value */
        localStorage.setItem(`${arrowName.id}`, "▼");
    }
}

nameArrow.onclick = function() {
    changeArrow(nameArrow);
    sortName();
}

dateArrow.onclick = function() {
    changeArrow(dateArrow);
    sortDate();
}

infArrow.onclick = function() {
    changeArrow(infArrow);
    sortNumber();
}

expArrow.onclick = function() {
    changeArrow(expArrow);
    sortNumber();
}


function sortName() {
    let sortNameArr = [];
    for (i = 1; i < filenameArr.length; i++){
        sortNameArr.push(filenameArr[i]);
    }

    // Her er et array med alle navnene uden det første "0" element
    console.log(sortNameArr); 
    
    /* https://www.codegrepper.com/code-examples/javascript/javascript+sort+alphabetically */
    sortNameArr.sort(function (a, b) {
        return a.localeCompare(b);
    });

    console.log(sortNameArr);

}

function sortDate() {   
    let sortDateArr = [];
    for (i = 1; i < dateArr.length; i++){
        sortDateArr.push(dateArr[i]);
    }
    // Array med datoerne uden det første "0" element
    console.log(sortDateArr);
}

function sortNumber() {   

}