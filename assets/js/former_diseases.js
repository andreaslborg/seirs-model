/* Set the new values to the cookies */
function setCookieValues() {
    localStorage.setItem("transValue", beta);
    localStorage.setItem("remValue", gamma); 
    localStorage.setItem("S0Value", S0);
    localStorage.setItem("I0Value", I0);
    localStorage.setItem("R0Value", R0);
    localStorage.setItem("stepValue", h);
    localStorage.setItem("totalStepValue", steps); 
}

/* Set the new values to the sliders and forms */
function setFormSliders() {
    transForm.value = beta;
    transSlider.value = beta;
    remForm.value = gamma;
    remSlider.value = gamma;
    S0Form.value = S0;
    S0Slider.value = S0;
    I0Form.value = I0;
    I0Slider.value = I0;
    R0Form.value = R0;
    R0Slider.value = R0;
    stepForm.value = h;
    stepSlider.value = h;
    totalStepForm.value = steps;
    totalStepSlider.value = steps;
}

function covid19Algeria() {
    beta = 0.0561215;
    gamma = 0.0455331;
    S0 = 99000;
    I0 = 1000;
    R0 = 0;
    h = 0.1;                 // Stepsize
    steps = 5001;           // Total steps
    N = S0 + I0 + R0;
    dataS = [S0];
    dataI = [I0];
    dataR = [R0];

    setCookieValues();
    setFormSliders();
    rk4sir();
}