// Checks if it is the first visit
function checkVisit() {
    if (localStorage.getItem("firstVisit") === null) {
        console.log("First visit");

        localStorage.setItem("firstVisit", 1);
        localStorage.setItem("betaValue", 2);
        localStorage.setItem("gammaValue", 0.1);
        localStorage.setItem("epsilonValue", 0.001);
        localStorage.setItem("sigmaValue", 0.08);
        localStorage.setItem("S0Value", 5806000);
        localStorage.setItem("E0Value", 0);
        localStorage.setItem("I0Value", 100);
        localStorage.setItem("R0Value", 0);
        localStorage.setItem("daysValue", 100);
        localStorage.setItem("checkboxFixPopValue", 0);

        let data = JSON.stringify([0]);
        localStorage.setItem("filenameArrCookie", data);
        localStorage.setItem("dateArrCookie", data);
        localStorage.setItem("peakInfArrCookie", data);
        localStorage.setItem("peakExpArrCookie", data);
        localStorage.setItem("parametersArrCookie", data);

        // Show popup guide
        popupGuide.style.display = "block"; 
    } else {
        visitCounter = parseFloat(localStorage.getItem("firstVisit")) + 1;
        localStorage.setItem("firstVisit", visitCounter);
        console.log("Welcome back, this is your " + visitCounter + ". visit");

        arrowsColorCookies();        
        runSavedParameters();
    }
}

// Set the new values to the cookies
function setCookieValues() {
    localStorage.setItem("checkboxFixPopValue", parameterObj.checkboxFixPopValue)
    localStorage.setItem("betaValue", parameterObj.beta);
    localStorage.setItem("gammaValue", parameterObj.gamma);
    localStorage.setItem("sigmaValue", parameterObj.sigma);
    localStorage.setItem("epsilonValue", parameterObj.epsilon);
    localStorage.setItem("S0Value", parameterObj.S0);
    localStorage.setItem("E0Value", parameterObj.E0);
    localStorage.setItem("I0Value", parameterObj.I0);
    localStorage.setItem("R0Value", parameterObj.R0);
    localStorage.setItem("daysValue", parameterObj.days); 
}

// Updates the parameters
function updateParameters(){
    parameterObj.beta = parseFloat(localStorage.getItem("betaValue"));
    betaForm.value = parameterObj.beta;
    betaSlider.value = parameterObj.beta;

    parameterObj.gamma = parseFloat(localStorage.getItem("gammaValue"));
    gammaForm.value = parameterObj.gamma;
    gammaSlider.value = parameterObj.gamma;

    parameterObj.epsilon = parseFloat(localStorage.getItem("epsilonValue"));
    epsilonForm.value = parameterObj.epsilon;
    epsilonSlider.value = parameterObj.epsilon;
    
    parameterObj.sigma = parseFloat(localStorage.getItem("sigmaValue"));
    sigmaForm.value = parameterObj.sigma;
    sigmaSlider.value = parameterObj.sigma;

    parameterObj.S0 = parseFloat(localStorage.getItem("S0Value"));
    S0Form.value = parameterObj.S0;
    S0Slider.value = parameterObj.S0;

    parameterObj.I0 = parseFloat(localStorage.getItem("I0Value"));;
    I0Form.value = parameterObj.I0;
    I0Slider.value = parameterObj.I0;
    
    parameterObj.E0 = parseFloat(localStorage.getItem("E0Value"));;
    E0Form.value = parameterObj.E0;
    E0Slider.value = parameterObj.E0;
  
    parameterObj.R0 = parseFloat(localStorage.getItem("R0Value"));;
    R0Form.value = parameterObj.R0;
    R0Slider.value = parameterObj.R0;
    
    parameterObj.days = parseFloat(localStorage.getItem("daysValue"));
    daysForm.value = parameterObj.days;
    daysSlider.value = parameterObj.days;
    
    checkboxFixPop.checked = parseInt(localStorage.getItem("checkboxFixPopValue"));
}