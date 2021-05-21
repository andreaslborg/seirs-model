let S0Form = document.getElementById("S0Form1"), 
    S0Slider = document.getElementById("S0Slider1"),
    S0Title = document.getElementById("S0Title"),
    S0Des = document.getElementById("S0Des"),

    E0Form = document.getElementById("E0Form1"),
    E0Slider = document.getElementById("E0Slider1"),

    I0Form = document.getElementById("I0Form1"),
    I0Slider = document.getElementById("I0Slider1"),

    R0Form = document.getElementById("R0Form1"),
    R0Slider = document.getElementById("R0Slider1"),

    betaForm = document.getElementById("betaForm1"),
    betaSlider = document.getElementById("betaSlider1"),
    
    sigmaForm = document.getElementById("sigForm1"),
    sigmaSlider = document.getElementById("sigSlider1"),

    gammaForm = document.getElementById("gammaForm1"),
    gammaSlider = document.getElementById("gammaSlider1"),

    epsilonForm = document.getElementById("epsForm1"),
    epsilonSlider = document.getElementById("epsSlider1"),

    daysForm = document.getElementById("daysForm1"),
    daysSlider = document.getElementById("daysSlider1"),
    totalStepsDes = document.getElementById("totalSteps"),

    totalN = document.getElementById("totalPopulation"),
    maxInf = document.getElementById("maxInfected"),
    maxExp = document.getElementById("maxExposed"),
    maxInfPer = document.getElementById("maxInfectedPercent"),
    maxExpPer = document.getElementById("maxExposedPercent"),

    checkboxFixPop = document.getElementById("fixedPopulation");

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
}
betaSlider.oninput = function() {
    localStorage.setItem("betaValue", this.value);         
    betaForm.value = this.value;
    beta = this.value;
    runGraph();
}

sigmaForm.oninput = function() {
    localStorage.setItem("sigmaValue", this.value);           
    sigmaSlider.value = this.value;
    sigma = parseFloat(this.value);          
    runGraph();
}
sigmaSlider.oninput = function() {
    localStorage.setItem("sigmaValue", this.value);           
    sigmaForm.value = this.value;
    sigma = parseFloat(this.value);
    runGraph();
}

gammaForm.oninput = function() {
    localStorage.setItem("gammaValue", this.value);           
    gammaSlider.value = this.value;
    gamma = this.value;
    runGraph();
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
}
epsilonSlider.oninput = function() {
    localStorage.setItem("epsilonValue", this.value);           
    epsilonForm.value = this.value;
    epsilon = parseFloat(this.value);
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