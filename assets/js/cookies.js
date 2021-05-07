function clearCookies() {
    localStorage.clear();
}

function checkVisit() {
    if (localStorage.getItem("firstVisit") === null) {
        console.log("First visit");
        localStorage.setItem("firstVisit", 1);
        let beta = 2.2,
            gamma = 0.33333,
            epsilon = 0.07142,
            sigma = 0.1428,
            S0 = 199,
            E0 = 0,
            I0 = 1,
            R0 = 0,
            h = 0.01,
            steps = 100;
        localStorage.setItem("betaValue", beta);
        localStorage.setItem("gammaValue", gamma);
        localStorage.setItem("epsilonValue", epsilon);
        localStorage.setItem("sigmaValue", sigma);
        localStorage.setItem("S0Value", S0);
        localStorage.setItem("E0Value", E0);
        localStorage.setItem("I0Value", I0);
        localStorage.setItem("R0Value", R0);
        localStorage.setItem("stepValue", h);
        localStorage.setItem("totalStepValue", steps);

        let data = JSON.stringify([0]);
        localStorage.setItem("savedTable.filenameCookie", data);
        localStorage.setItem("savedTable.dateCookie", data);
        localStorage.setItem("savedTable.parametersCookie", data);
        
    } else {
        visitCounter = parseFloat(localStorage.getItem("firstVisit")) + 1;
        localStorage.setItem("firstVisit", visitCounter);
        console.log("Welcome back, this is your " + visitCounter + ". visit");
    }
}

/* This function loads all values from last sessions saved as cookies */
function allCookies() {
    /* Loads Beta */
    betaCookie = parseFloat(localStorage.getItem("betaValue"));
    betaForm.value = betaCookie;
    betaSlider.value = betaCookie;

    /* Loads Gamma */
    gammaCookie = parseFloat(localStorage.getItem("gammaValue"));
    gammaForm.value = gammaCookie;
    gammaSlider.value = gammaCookie;

    /* Epsilon */
    epsilonCookie = parseFloat(localStorage.getItem("epsilonValue"));
    epsilonForm.value = epsilonCookie;
    epsilonSlider.value = epsilonCookie;
    
    /* Sigma */
    sigmaCookie = parseFloat(localStorage.getItem("sigmaValue"));
    sigmaForm.value = sigmaCookie;
    sigmaSlider.value = sigmaCookie;

    /* Loads S0 */
    S0Cookie = parseFloat(localStorage.getItem("S0Value"));
    S0Form.value = S0Cookie;
    S0Slider.value = S0Cookie;

    /* Loads I0 */
    I0Cookie = parseFloat(localStorage.getItem("I0Value"));
    I0Form.value = I0Cookie;
    I0Slider.value = I0Cookie;

    /* Exposed */
    E0Cookie = parseFloat(localStorage.getItem("E0Value"));
    E0Form.value = E0Cookie;
    E0Slider.value = E0Cookie;
  
    /* Loads R0 */
    R0Cookie = parseFloat(localStorage.getItem("R0Value"));
    R0Form.value = R0Cookie;
    R0Slider.value = R0Cookie;
    
    /* Loads Step size */
    stepCookie = parseFloat(localStorage.getItem("stepValue"));
    //stepForm.value = stepCookie;
    //stepSlider.value = stepCookie;
    
    /* Loads Total step size */
    totalStepCookie = parseFloat(localStorage.getItem("totalStepValue"));
    totalStepForm.value = totalStepCookie;
    totalStepSlider.value = totalStepCookie;

    /* Fixed population checkbox */
    checkboxFixPop.checked = parseInt(localStorage.getItem("checkboxFixPopValue"));
}

