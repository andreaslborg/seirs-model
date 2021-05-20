let S0Form = document.getElementById("S0Form1");
let S0Slider = document.getElementById("S0Slider1");
let S0Title = document.getElementById("S0Title");
let S0Des = document.getElementById("S0Des");

let E0Form = document.getElementById("E0Form1");
let E0Slider = document.getElementById("E0Slider1");

let I0Form = document.getElementById("I0Form1");
let I0Slider = document.getElementById("I0Slider1");

let R0Form = document.getElementById("R0Form1");
let R0Slider = document.getElementById("R0Slider1");

let betaForm = document.getElementById("betaForm1");
let betaSlider = document.getElementById("betaSlider1");

let gammaForm = document.getElementById("gammaForm1");
let gammaSlider = document.getElementById("gammaSlider1");

let epsilonForm = document.getElementById("epsForm1");
let epsilonSlider = document.getElementById("epsSlider1");

let sigmaForm = document.getElementById("sigForm1");
let sigmaSlider = document.getElementById("sigSlider1");

let daysForm = document.getElementById("daysForm1");
let daysSlider = document.getElementById("daysSlider1");
let totalStepsDes = document.getElementById("totalSteps");

let totalN = document.getElementById("totalPopulation");
let maxInf = document.getElementById("maxInfected");
let maxExp = document.getElementById("maxExposed");
let maxInfPer = document.getElementById("maxInfectedPercent");
let maxExpPer = document.getElementById("maxExposedPercent");

let checkboxFixPop = document.getElementById("fixedPopulation");

S0Form.oninput = function() {
    localStorage.setItem("S0Value", this.value);   
    S0Slider.value = this.value;
    S0 = parseFloat(this.value);
    runGraph();
}
S0Slider.oninput = function() {
    localStorage.setItem("S0Value", this.value); 
    S0Form.value = this.value;
    S0 = parseFloat(this.value);
    runGraph();
}

E0Form.oninput = function() {
    localStorage.setItem("E0Value", this.value);           
    E0Slider.value = this.value;
    E0 = parseFloat(this.value);          
    runGraph();
    errorMessage.innerHTML = errorCheck(this.value);
} 
E0Slider.oninput = function() {
    localStorage.setItem("E0Value", this.value);           
    E0Form.value = this.value;
    E0 = parseFloat(this.value);
    runGraph();
}

I0Form.oninput = function() {
    localStorage.setItem("I0Value", this.value); 
    I0Slider.value = this.value;
    I0 = parseFloat(this.value);          
    runGraph();
    errorMessage.innerHTML = errorCheck(this.value);
}
I0Slider.oninput = function() {
    localStorage.setItem("I0Value", this.value); 
    I0Form.value = this.value;
    I0 = parseFloat(this.value);
    runGraph();
}

R0Form.oninput = function() {
    localStorage.setItem("R0Value", this.value);           
    R0Slider.value = this.value;
    R0 = parseFloat(this.value);          
    runGraph();
    errorMessage.innerHTML = errorCheck(this.value);
}
R0Slider.oninput = function() {
    localStorage.setItem("R0Value", this.value);           
    R0Form.value = this.value;
    R0 = parseFloat(this.value);
    runGraph();
}

betaForm.oninput = function() {
    localStorage.setItem("betaValue", this.value);         
    betaSlider.value = this.value;
    beta = this.value;
    runGraph();
    errorMessage.innerHTML = errorCheck(this.value);
}
betaSlider.oninput = function() {
    localStorage.setItem("betaValue", this.value);         
    betaForm.value = this.value;
    beta = this.value;
    runGraph();
}

gammaForm.oninput = function() {
    localStorage.setItem("gammaValue", this.value);           
    gammaSlider.value = this.value;
    gamma = this.value;
    runGraph();
    errorMessage.innerHTML = errorCheck(this.value);
}
gammaSlider.oninput = function() {
    localStorage.setItem("gammaValue", this.value);           
    gammaForm.value = this.value;
    gamma = this.value;
    runGraph();
}

epsilonForm.oninput = function() {
    localStorage.setItem("epsilonValue", this.value);           
    epsilonSlider.value = this.value;
    epsilon = parseFloat(this.value);          
    runGraph();
    errorMessage.innerHTML = errorCheck(this.value);
}
epsilonSlider.oninput = function() {
    localStorage.setItem("epsilonValue", this.value);           
    epsilonForm.value = this.value;
    epsilon = parseFloat(this.value);
    runGraph();
}

sigmaForm.oninput = function() {
    localStorage.setItem("sigmaValue", this.value);           
    sigmaSlider.value = this.value;
    sigma = parseFloat(this.value);          
    runGraph();
    errorMessage.innerHTML = errorCheck(this.value);
}
sigmaSlider.oninput = function() {
    localStorage.setItem("sigmaValue", this.value);           
    sigmaForm.value = this.value;
    sigma = parseFloat(this.value);
    runGraph();
}

daysForm.oninput = function() {
    localStorage.setItem("daysValue", this.value);           
    daysSlider.value = this.value;
    days = parseFloat(this.value);          
    runGraph();
    removeComparisonGraph();
}
daysSlider.oninput = function() {
    localStorage.setItem("daysValue", this.value);           
    daysForm.value = this.value;
    days = parseFloat(this.value);
    runGraph();
    removeComparisonGraph();
}

checkboxFixPop.oninput = function() {
    runGraph();
}