// X Axis Slider
let xSlider = document.getElementById("xSlider1");
let xArr = [];

// Beta: Transmission rate
let betaForm = document.getElementById("betaForm1");
let betaSlider = document.getElementById("betaSlider1");

// Gamma: Removal or deceased rate
let gammaForm = document.getElementById("gammaForm1");
let gammaSlider = document.getElementById("gammaSlider1");

// Initial Susceptible
let S0Form = document.getElementById("S0Form1");
let S0Slider = document.getElementById("S0Slider1");

// Initial Exposed
let E0Form = document.getElementById("E0Form1");
let E0Slider = document.getElementById("E0Slider1");

// Initial infected
let I0Form = document.getElementById("I0Form1");
let I0Slider = document.getElementById("I0Slider1");

// Initial removed
let R0Form = document.getElementById("R0Form1");
let R0Slider = document.getElementById("R0Slider1");

// Step size
let stepForm = document.getElementById("stepForm1");
let stepSlider = document.getElementById("stepSlider1");

// Total Step size
let totalStepForm = document.getElementById("totalStepForm1");
let totalStepSlider = document.getElementById("totalStepSlider1");

// Sigma
let sigmaForm = document.getElementById("sigForm1");
let sigmaSlider = document.getElementById("sigSlider1");

// Epsilon
let epsilonForm = document.getElementById("epsForm1");
let epsilonSlider = document.getElementById("epsSlider1");

// Information box
let totalN = document.getElementById("totalPopulation");
let maxInf = document.getElementById("maxInfected");
let maxExp = document.getElementById("maxExposed");

/* Zoom on x axis with tArr */
xSlider.oninput = function() {
    zoomX();
    updateGraph();
}
function zoomX() {
    xArr = [];
    for(i = 0; i < xSlider.value; i++) {
        xArr[i] = parseInt(tArr[i]);
    }
    seirsChart.data.labels = xArr;
}

/* Beta: Transmission rate */
/* Update the current input value (each time you type in it) */
betaForm.oninput = function() {
    localStorage.setItem("betaValue", this.value);         // Cookie
    betaSlider.value = this.value;
    beta = this.value;
    rk4sir();
}
/* Update the current slider value (each time you drag the slider handle) */
betaSlider.oninput = function() {
    localStorage.setItem("betaValue", this.value);         // Cookie
    betaForm.value = this.value;
    beta = this.value;
    rk4sir();
}

/* Gamma: Removal or deceased rate */
gammaForm.oninput = function() {
    localStorage.setItem("gammaValue", this.value);           // Cookie
    gammaSlider.value = this.value;
    gamma = this.value;
    if(this.value != 0)
        rk4sir();
}
gammaSlider.oninput = function() {
    localStorage.setItem("gammaValue", this.value);           // Cookie
    gammaForm.value = this.value;
    gamma = this.value;
    rk4sir();
}

/* Epsilon */
epsilonForm.oninput = function() {
    localStorage.setItem("epsilonValue", this.value);           // Cookie
    epsilonSlider.value = this.value;
    epsilon = parseFloat(this.value);          // parseFloat converts it from a string to float
    rk4sir();
}
epsilonSlider.oninput = function() {
    localStorage.setItem("epsilonValue", this.value);           // Cookie
    epsilonForm.value = this.value;
    epsilon = parseFloat(this.value);
    rk4sir();
}

/* Sigma */
sigmaForm.oninput = function() {
    localStorage.setItem("sigmaValue", this.value);           // Cookie
    sigmaSlider.value = this.value;
    sigma = parseFloat(this.value);          // parseFloat converts it from a string to float
    rk4sir();
}
sigmaSlider.oninput = function() {
    localStorage.setItem("sigmaValue", this.value);           // Cookie
    sigmaForm.value = this.value;
    sigma = parseFloat(this.value);
    rk4sir();
}


/* S0: Initial Susceptible */
S0Form.oninput = function() {
    localStorage.setItem("S0Value", this.value);           // Cookie
    S0Slider.value = this.value;
    S0 = parseFloat(this.value);
    rk4sir();
}
S0Slider.oninput = function() {
    localStorage.setItem("S0Value", this.value);           // Cookie
    S0Form.value = this.value;
    S0 = parseFloat(this.value);
    rk4sir();

    //let pik;
    //pik = this.value;
    //console.log("value: " + pik);
    //pik = value.split('.').join('');
    ///console.log("value split: " + pik);
    
    //if (value.length > 3) {
    //  value = value.substring(0, value.length - 3) + '.' + value.substring(value.length - 3, value.length);
    //}
    
    //S0Slider.value = value;
    //S0 = value;
}

/* E0: Initial Exposed */
E0Form.oninput = function() {
    localStorage.setItem("E0Value", this.value);           // Cookie
    E0Slider.value = this.value;
    E0 = parseFloat(this.value);          // parseFloat converts it from a string to number
    rk4sir();
}
E0Slider.oninput = function() {
    localStorage.setItem("E0Value", this.value);           // Cookie
    E0Form.value = this.value;
    E0 = parseFloat(this.value);
    rk4sir();
}

/* I0: Initial infected */
I0Form.oninput = function() {
    localStorage.setItem("I0Value", this.value);           // Cookie
    I0Slider.value = this.value;
    I0 = parseFloat(this.value);          // parseFloat converts it from a string to number
    rk4sir();
}
I0Slider.oninput = function() {
    localStorage.setItem("I0Value", this.value);           // Cookie
    I0Form.value = this.value;
    I0 = parseFloat(this.value);
    rk4sir();
}

/* R0: Initial Removed */
R0Form.oninput = function() {
    localStorage.setItem("R0Value", this.value);           // Cookie
    R0Slider.value = this.value;
    R0 = parseFloat(this.value);          // parseFloat converts it from a string to float
    rk4sir();
}
R0Slider.oninput = function() {
    localStorage.setItem("R0Value", this.value);           // Cookie
    R0Form.value = this.value;
    R0 = parseFloat(this.value);
    rk4sir();
}

/* h: Step size */
stepForm.oninput = function() {
    localStorage.setItem("stepValue", this.value);           // Cookie
    stepSlider.value = this.value;
    h = parseFloat(this.value);             // parseFloat converts it from a string to float
    rk4sir();
}
stepSlider.oninput = function() {
    localStorage.setItem("stepValue", this.value);           // Cookie
    stepForm.value = this.value;
    h = parseFloat(this.value);
    rk4sir();
}

/* steps: Total step size */
totalStepForm.oninput = function() {
    localStorage.setItem("totalStepValue", this.value);           // Cookie
    totalStepSlider.value = this.value;
    steps = parseFloat(this.value);          // parseFloat converts it from a string to float
    xSlider.max = this.value;
    rk4sir();
}
totalStepSlider.oninput = function() {
    localStorage.setItem("totalStepValue", this.value);           // Cookie
    totalStepForm.value = this.value;
    steps = parseFloat(this.value);
    xSlider.max = this.value;
    rk4sir();
}