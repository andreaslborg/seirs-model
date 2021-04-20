function checkVisit() {
    if (localStorage.getItem("firstVisit") === null) {
        console.log("First visit");
        localStorage.setItem("firstVisit", 1);
        let beta = 0.025,
            gamma = 0.0006,
            S0 = 99000,
            I0 = 1000,
            E0 = 10,
            R0 = 0,
            h = 0.1,
            steps = 10000;
        localStorage.setItem("transValue", beta);
        localStorage.setItem("remValue", gamma); 
        localStorage.setItem("S0Value", S0);
        localStorage.setItem("E0Value", E0);
        localStorage.setItem("I0Value", I0);
        localStorage.setItem("R0Value", R0);
        localStorage.setItem("stepValue", h);
        localStorage.setItem("totalStepValue", steps);
    } else {
        visitCounter = parseFloat(localStorage.getItem("firstVisit")) + 1;
        localStorage.setItem("firstVisit", visitCounter);
        console.log("Welcome back, this is your " + visitCounter + ". visit");
    }
}

/* This function loads all values from last sessions saved as cookies */
function allCookies() {
    /* Loads Beta */
    transCookie = parseFloat(localStorage.getItem("transValue"));
    transForm.value = transCookie;
    transSlider.value = transCookie;

    /* Loads Gamma */
    remCookie = parseFloat(localStorage.getItem("remValue"));
    remForm.value = remCookie;
    remSlider.value = remCookie;

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
    stepForm.value = stepCookie;
    stepSlider.value = stepCookie;
    
    /* Loads Total step size */
    totalStepCookie = parseFloat(localStorage.getItem("totalStepValue"));
    totalStepForm.value = totalStepCookie;
    totalStepSlider.value = totalStepCookie;

    /* Sigma */
    sigmaCookie = parseFloat(localStorage.getItem("sigmaValue"));
    sigmaForm.value = sigmaCookie;
    sigmaSlider.value = sigmaCookie;

    /* Epsilon */
    epsilonCookie = parseFloat(localStorage.getItem("epsilonValue"));
    epsilonForm.value = epsilonCookie;
    epsilonSlider.value = epsilonCookie;
}

