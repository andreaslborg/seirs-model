// Clears the cookies
function clearCookies() {
    localStorage.clear();
    console.log("Cookies cleared.");
}

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
    } else {
        visitCounter = parseFloat(localStorage.getItem("firstVisit")) + 1;
        localStorage.setItem("firstVisit", visitCounter);
        console.log("Welcome back, this is your " + visitCounter + ". visit");
    }
}

// Updates the cookies
function updateCookies(){
    beta = parseFloat(localStorage.getItem("betaValue"));
    betaForm.value = beta;
    betaSlider.value = beta;

    gamma = parseFloat(localStorage.getItem("gammaValue"));
    gammaForm.value = gamma;
    gammaSlider.value = gamma;

    epsilon = parseFloat(localStorage.getItem("epsilonValue"));
    epsilonForm.value = epsilon;
    epsilonSlider.value = epsilon;
    
    sigma = parseFloat(localStorage.getItem("sigmaValue"));
    sigmaForm.value = sigma;
    sigmaSlider.value = sigma;

    S0 = parseFloat(localStorage.getItem("S0Value"));
    S0Form.value = S0;
    S0Slider.value = S0;

    I0 = parseFloat(localStorage.getItem("I0Value"));;
    I0Form.value = I0;
    I0Slider.value = I0;
    
    E0 = parseFloat(localStorage.getItem("E0Value"));;
    E0Form.value = E0;
    E0Slider.value = E0;
  
    R0 = parseFloat(localStorage.getItem("R0Value"));;
    R0Form.value = R0;
    R0Slider.value = R0;
    
    days = parseFloat(localStorage.getItem("daysValue"));
    daysForm.value = days;
    daysSlider.value = days;

    checkboxFixPop.checked = parseInt(localStorage.getItem("checkboxFixPopValue"));
}