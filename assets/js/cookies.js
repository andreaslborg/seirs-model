function clearCookies() {
    localStorage.clear();
    console.log("Cookies cleared.")
}

function checkVisit() {
    if (localStorage.getItem("firstVisit") === null) {
        console.log("First visit");

        /* Sets the default values first time a user visits */
        let beta = 1,
            gamma = 0.1,
            epsilon = 0.001,
            sigma = 0.1,
            S0 = 199,
            E0 = 0,
            I0 = 1,
            R0 = 0,
            h = 0.01,
            steps = 100; 
        checkboxFixPop.checked = 0;
        localStorage.setItem("firstVisit", 1);
        localStorage.setItem("betaValue", beta);
        localStorage.setItem("gammaValue", gamma);
        localStorage.setItem("epsilonValue", epsilon);
        localStorage.setItem("sigmaValue", sigma);
        localStorage.setItem("S0Value", S0);
        localStorage.setItem("E0Value", E0);
        localStorage.setItem("I0Value", I0);
        localStorage.setItem("R0Value", R0);
        localStorage.setItem("totalStepValue", steps);

        /* Creates an JSON array which is the values of the three cookies */
        let data = JSON.stringify([0]);
        localStorage.setItem("filenameArrCookie", data);
        localStorage.setItem("dateArrCookie", data);
        localStorage.setItem("peakInfArrCookie", data);
        localStorage.setItem("peakExpArrCookie", data);
        localStorage.setItem("parametersArrCookie", data);
        
        localStorage.setItem("nameArrow", "▼");
        localStorage.setItem("dateArrow", "▼");
        localStorage.setItem("infArrow", "▼");
        localStorage.setItem("expArrow", "▼");
    } else {
        /* Counts the number of visits */
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
    
    /* Loads Total step size */
    totalStepCookie = parseFloat(localStorage.getItem("totalStepValue"));
    totalStepForm.value = totalStepCookie;
    totalStepSlider.value = totalStepCookie;

    /* Fixed population checkbox */
    checkboxFixPop.checked = parseInt(localStorage.getItem("checkboxFixPopValue"));



}

