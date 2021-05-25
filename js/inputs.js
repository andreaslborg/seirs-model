let errorMessage = document.getElementById("error"),
    confirmButtonsGraph = document.getElementById("confirmReset"),
    confirmResetCookies = document.getElementById("confirmResetCookies");

// Checks if the 
function errorCheck() {
    let errorArr = [parameterObj.N, parameterObj.S0, parameterObj.E0, parameterObj.I0, parameterObj.R0, parameterObj.beta, parameterObj.sigma, parameterObj.gamma, parameterObj.epsilon, parameterObj.days];
    
    if (checkboxFixPop.checked == 0) {
        if (parameterObj.N < parameterObj.S0 + parameterObj.E0 + parameterObj.I0 + parameterObj.R0) {
            errorMessage.innerHTML = `The sum of S<span class="sub">0</span>, E<span class="sub">0</span>, I<span class="sub">0</span>, and R<span class="sub">0</span> cannot be more than the total population (N).`;
            return;
        }
    }
    if (dataObj.totalSteps > 1000000) {
        errorMessage.innerHTML = "Due to reliability, the max days is 10000.";
        return;
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
    
    parameterObj.beta = 2;
    parameterObj.gamma = 0.1;
    parameterObj.epsilon = 0.001;    
    parameterObj.sigma = 0.08;
    parameterObj.S0 = 5806000;
    parameterObj.E0 = 0;
    parameterObj.I0 = 100;
    parameterObj.R0 = 0;
    parameterObj.days = 100;  
    parameterObj.checkboxFixPopValue = 0;
    
    errorCheck();
    setCookieValues();
    updateParameters();
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