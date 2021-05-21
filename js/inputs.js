let errorMessage = document.getElementById("error"),
    confirmButtonsGraph = document.getElementById("confirmReset"),
    confirmResetCookies = document.getElementById("confirmResetCookies");

// Checks if the 
function errorCheck() {
    let errorArr = [N, S0, E0, I0, R0, beta, sigma, gamma, epsilon, days];
    
    if (checkboxFixPop.checked == 0) {
        if (N < S0 + E0 + I0 + R0) {
            errorMessage.innerHTML = `The sum of S<span class="sub">0</span>, E<span class="sub">0</span>, I<span class="sub">0</span>, and R<span class="sub">0</span> cannot be more than the total population (N).`;
            return;
        }
    }
    for (i = 0; i < errorArr.length; i++) {
        if (errorArr[i] < 0) {
            errorMessage.innerHTML = "The value of the parameter(s) must be at least 0."; 
            return;
        } else
            errorMessage.innerHTML = "";
    }
}

// Resets graph to default parameters
function resetGraph() {
    confirmButtonsGraph.innerHTML = `<em class="modalText">Are you sure?</em><button onclick="resetGraphYes()">Yes</button><button onclick="resetGraphNo()">No</button>`; 
}

// Yes button
function resetGraphYes() {
    console.log("Resetting parameters.");
    
    checkboxFixPopValue = 0;
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
    
    errorCheck()
    setCookieValues();
    updateParameters()
    removeComparisonGraph();
    runGraph();

    // Removes the buttons
    confirmButtonsGraph.innerHTML = "";
}

// No button
function resetGraphNo() {
    confirmButtonsGraph.innerHTML = "";
}

// Clears the cookies
function clearCookies() {
    confirmResetCookies.innerHTML = `<em class="modalText">This will delete all saved parameters. Are you sure?</em><button onclick="clearCookiesYes()">Yes</button><button onclick="clearCookiesNo()">No</button>`;
}

function clearCookiesYes() {
    localStorage.clear();
    confirmResetCookies.innerHTML = "";
}

function clearCookiesNo() {
    confirmResetCookies.innerHTML = "";
}