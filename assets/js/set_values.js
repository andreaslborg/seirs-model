/* Set the new values to the cookies */
function setCookieValues() {
    localStorage.setItem("betaValue", beta);
    localStorage.setItem("gammaValue", gamma);
    localStorage.setItem("sigmaValue", sigma);
    localStorage.setItem("epsilonValue", epsilon);
    localStorage.setItem("S0Value", S0);
    localStorage.setItem("E0Value", E0);
    localStorage.setItem("I0Value", I0);
    localStorage.setItem("R0Value", R0);
    localStorage.setItem("totalStepValue", days); 
}

/* Set the new values to the sliders and forms */
function setFormSliders() {
    betaForm.value = beta;
    betaSlider.value = beta;
    gammaForm.value = gamma;
    gammaSlider.value = gamma;
    epsilonForm.value = epsilon;
    epsilonSlider.value = epsilon;
    sigmaForm.value = sigma;
    sigmaSlider.value = sigma;
    S0Form.value = S0;
    S0Slider.value = S0;
    E0Form.value = E0;
    E0Slider.value = E0;
    I0Form.value = I0;
    I0Slider.value = I0;
    R0Form.value = R0;
    R0Slider.value = R0;
    totalStepForm.value = days;
    totalStepSlider.value = days;
    
}
