/* Update the current input value (each time you type in it) */

/* Function to write an error if there is now value in the form */
let errorMessage = document.getElementById("error");

function errorCheck(value) {
    /* If the form input is empty */
    if (value == "") { errorMessage.innerHTML = "Your initial value must be atleast 0."; }
    /* If the sum of EIR is greater than the population */
    else if (value > N) { errorMessage.innerHTML = `Error. The sum of E<span class="sub">0</span>, I<span class="sub">0</span> and R<span class="sub">0</span> can't be more than the total population (N).`; }
    /* Removes the text if none of the above statements hold */
    else { errorMessage.innerHTML = ""; }
}


/* Function to calculate total population and S0, depending on the checkbox "Fixed Population" */
function fixedPopulation() {
    /* If the box is checked */
    if (checkboxFixPop.checked == 1) {
        /* Calculate susceptible (S0) */
        N = parseFloat(localStorage.getItem("S0Value"));
        S0 = N - E0 - I0 - R0;

        /* Edits title and description */
        S0Title.innerHTML = `Total Population (N)`;
        S0Des.innerHTML = `S<span class="sub">0</span> = ` + S0;

        /* Setting cookie value for the checkbox to 1 (true) */
        localStorage.setItem("checkboxFixPopValue", 1);

        /* Writes a error message if the sum of E0, I0 and R0 is larger than N */
        let sumEIR = E0+I0+R0;
        errorCheck(sumEIR);

    /* If the box is not checked */
    } else if (checkboxFixPop.checked == 0) {
        /* Calculate population (N) */
        S0 = parseFloat(localStorage.getItem("S0Value"));
        N = S0 + E0 + I0 + R0;
        
        /* Edits title and description */
        S0Title.innerHTML = `Initial Susceptible (S<span class="sub">0</span>)`;
        S0Des.innerHTML = `Amount of people who are susceptible to the disease.`;
        errorMessage.innerHTML = "";

        /* Setting cookie value for the checkbox to 0 (false) */
        localStorage.setItem("checkboxFixPopValue", 0);
    }
}


/* S0 Initial Susceptible */
let S0Form = document.getElementById("S0Form1");
let S0Slider = document.getElementById("S0Slider1");
let S0Title = document.getElementById("S0Title");
let S0Des = document.getElementById("S0Des");

S0Form.oninput = function() {
    localStorage.setItem("S0Value", this.value);   
    S0Slider.value = this.value;
    S0 = parseFloat(this.value);
    rk4seirs();
    errorCheck(this.value);
}
S0Slider.oninput = function() {
    localStorage.setItem("S0Value", this.value); 
    S0Form.value = this.value;
    S0 = parseFloat(this.value);
    rk4seirs();
    errorCheck(this.value);
}


/* E0 Initial Exposed */
let E0Form = document.getElementById("E0Form1");
let E0Slider = document.getElementById("E0Slider1");

E0Form.oninput = function() {
    localStorage.setItem("E0Value", this.value);           
    E0Slider.value = this.value;
    E0 = parseFloat(this.value);          
    rk4seirs();
    errorCheck(this.value);
} 
E0Slider.oninput = function() {
    localStorage.setItem("E0Value", this.value);           
    E0Form.value = this.value;
    E0 = parseFloat(this.value);
    rk4seirs();
    errorCheck(this.value);
}


/* I0 Initial infected */
let I0Form = document.getElementById("I0Form1");
let I0Slider = document.getElementById("I0Slider1");

I0Form.oninput = function() {
    localStorage.setItem("I0Value", this.value); 
    I0Slider.value = this.value;
    I0 = parseFloat(this.value);          
    rk4seirs();
    errorCheck(this.value);
}
I0Slider.oninput = function() {
    localStorage.setItem("I0Value", this.value); 
    I0Form.value = this.value;
    I0 = parseFloat(this.value);
    rk4seirs();
    errorCheck(this.value);
}


/* R0 Initial removed */
let R0Form = document.getElementById("R0Form1");
let R0Slider = document.getElementById("R0Slider1");

R0Form.oninput = function() {
    localStorage.setItem("R0Value", this.value);           
    R0Slider.value = this.value;
    R0 = parseFloat(this.value);          
    rk4seirs();
    errorCheck(this.value);
}
R0Slider.oninput = function() {
    localStorage.setItem("R0Value", this.value);           
    R0Form.value = this.value;
    R0 = parseFloat(this.value);
    rk4seirs();
    errorCheck(this.value);
}


/* Beta */
let betaForm = document.getElementById("betaForm1");
let betaSlider = document.getElementById("betaSlider1");

betaForm.oninput = function() {
    localStorage.setItem("betaValue", this.value);         
    betaSlider.value = this.value;
    beta = this.value;
    rk4seirs();
}
betaSlider.oninput = function() {
    localStorage.setItem("betaValue", this.value);         
    betaForm.value = this.value;
    beta = this.value;
    rk4seirs();
}


/* Gamma */
let gammaForm = document.getElementById("gammaForm1");
let gammaSlider = document.getElementById("gammaSlider1");

gammaForm.oninput = function() {
    localStorage.setItem("gammaValue", this.value);           
    gammaSlider.value = this.value;
    gamma = this.value;
    if(this.value != 0)
        rk4seirs();
}
gammaSlider.oninput = function() {
    localStorage.setItem("gammaValue", this.value);           
    gammaForm.value = this.value;
    gamma = this.value;
    rk4seirs();
}


/* Epsilon */
let epsilonForm = document.getElementById("epsForm1");
let epsilonSlider = document.getElementById("epsSlider1");

epsilonForm.oninput = function() {
    localStorage.setItem("epsilonValue", this.value);           
    epsilonSlider.value = this.value;
    epsilon = parseFloat(this.value);          
    rk4seirs();
}
epsilonSlider.oninput = function() {
    localStorage.setItem("epsilonValue", this.value);           
    epsilonForm.value = this.value;
    epsilon = parseFloat(this.value);
    rk4seirs();
}


/* Sigma */
let sigmaForm = document.getElementById("sigForm1");
let sigmaSlider = document.getElementById("sigSlider1");

sigmaForm.oninput = function() {
    localStorage.setItem("sigmaValue", this.value);           
    sigmaSlider.value = this.value;
    sigma = parseFloat(this.value);          
    rk4seirs();
}
sigmaSlider.oninput = function() {
    localStorage.setItem("sigmaValue", this.value);           
    sigmaForm.value = this.value;
    sigma = parseFloat(this.value);
    rk4seirs();
}


/* Days: Total Step size */
let totalStepForm = document.getElementById("totalStepForm1");
let totalStepSlider = document.getElementById("totalStepSlider1");

totalStepForm.oninput = function() {
    localStorage.setItem("totalStepValue", this.value);           
    totalStepSlider.value = this.value;
    steps = parseFloat(this.value);          
    rk4seirs();
}
totalStepSlider.oninput = function() {
    localStorage.setItem("totalStepValue", this.value);           
    totalStepForm.value = this.value;
    steps = parseFloat(this.value);
    rk4seirs();
}


/* Information box */
let totalN = document.getElementById("totalPopulation");
let maxInf = document.getElementById("maxInfected");
let maxExp = document.getElementById("maxExposed");


/* Fixed population checkbox */
let checkboxFixPop = document.getElementById("fixedPopulation");

checkboxFixPop.oninput = function() {
    rk4seirs();
}

/* Reset button functions */
let confirmButtons = document.getElementById("confirmReset");

function resetGraph() {
    confirmButtons.innerHTML = `<em class="modalText">Are you sure?</em><button onclick="confirmYes()">Yes</button><button onclick="confirmNo()">No</button>`; 
}
/* "Yes" button */
function confirmYes() {
    console.log("Resetting parameters.");
    
    checkboxFixPop.checked = 0;
    beta = 1;
    gamma = 0.1;
    epsilon = 0.001;    
    sigma = 0.1;
    S0 = 199;
    E0 = 0;
    I0 = 1;
    R0 = 0;
    h = 0.01;
    steps = 100; 
    
    setCookieValues();
    setFormSliders();
    rk4seirs();

    /* Removes the buttons */
    confirmButtons.innerHTML = "";
}
/* "No" button */
function confirmNo() {
    confirmButtons.innerHTML = "";
}