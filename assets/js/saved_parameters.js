function saveParameters() {
    let table = document.getElementById("savedParametersTable");
    let fileForm = document.getElementById("savedName");

    /* Inserts a new */
    let row = table.insertRow();

    /* Defines the new cells spot */
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    
    /* File name */
    let fileName = fileForm.value;
    if (fileName == "") fileName = "<em>No file name</em>";

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
    cell1.innerHTML = fileName;
    cell2.innerHTML = currentDate;
    cell3.innerHTML = "<button>Load</button>";
    cell4.innerHTML = "<button>Delete</button>";
}