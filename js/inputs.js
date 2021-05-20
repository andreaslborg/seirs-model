// Function to write an error if there is now value in the form 
let errorMessage = document.getElementById("error");

// Reset button functions
let confirmButtons = document.getElementById("confirmReset");

// Error function
function errorCheck(value) {
    let errMess;

    if (value == "") { errMess = "Your initial value must be atleast 0."; }
    else if (value > N) { errMess = `Error. The sum of E<span class="sub">0</span>, I<span class="sub">0</span> and R<span class="sub">0</span> can't be more than the total population (N).`; }
    else if (value < 0) { errMess = `Value can't be less than zero`; }
    else { errMess = ""; }

    return errMess;
}

function resetGraph() {
    confirmButtons.innerHTML = `<em class="modalText">Are you sure?</em><button onclick="confirmYes()">Yes</button><button onclick="confirmNo()">No</button>`; 
}

// Yes button
function confirmYes() {
    console.log("Resetting parameters.");
    
    checkboxFixPop.checked = 0;
    beta = 1;
    gamma = 0.1;
    epsilon = 0.001;    
    sigma = 0.1;
    S0 = 199;
    E0 = 0;
    I0 = 1;
    R0 = 0;
    h = 0.01;
    days = 100; 
    
    setCookieValues();
    setFormSliders();
    removeComparisonGraph();
    runGraph();

    // Removes the buttons
    confirmButtons.innerHTML = "";
}
// No button
function confirmNo() {
    confirmButtons.innerHTML = "";
}