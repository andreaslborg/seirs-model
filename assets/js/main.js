// X Axis Slider
let xSlider = document.getElementById("xSlider1");
let xArr = [];

// Reproduction Rate
let reproForm = document.getElementById("reproForm1");
let reproSlider = document.getElementById("reproSlider1");

// Population
let popForm = document.getElementById("popForm1");
let popSlider = document.getElementById("popSlider1");

// Transmission
let tranForm = document.getElementById("tranForm1");
let tranSlider = document.getElementById("tranSlider1");

// Initial infected
let infForm = document.getElementById("infForm1");
let infSlider = document.getElementById("infSlider1");

// Initial removed
let recForm = document.getElementById("recForm1");
let recSlider = document.getElementById("recSlider1");

// Step size
let stepForm = document.getElementById("stepForm1");
let stepSlider = document.getElementById("stepSlider1");

// Total Step size
let totalStepForm = document.getElementById("totalStepForm1");
let totalStepSlider = document.getElementById("totalStepSlider1");

// Information box
let totalN = document.getElementById("totalPopulation");

// Zoom on x axis with tArr
xSlider.oninput = function() {
    zoomX();
    updateGraph();
}

function zoomX() {
    xArr = [];
    for(i = 0; i < xSlider.value; i++) {
        xArr[i] = tArr[i];
    }
    myChart.data.labels = xArr;
}

/* Beta */
// Update the current input value (each time you type in it)
reproForm.oninput = function() {
    localStorage.setItem("reproValue", this.value);         // Cookie
    reproSlider.value = this.value;
    beta = this.value;
    rk4sir();
}

// Update the current slider value (each time you drag the slider handle)
reproSlider.oninput = function() {
    localStorage.setItem("reproValue", this.value);         // Cookie
    reproForm.value = this.value;
    beta = this.value;
    rk4sir();
}

// Remembers last reproction value using cookie
reproCookie = localStorage.getItem("reproValue");          
reproForm.value = reproCookie;
reproSlider.value = reproCookie;

/* Gamma */
popForm.oninput = function() {
    localStorage.setItem("popValue", this.value);           // Cookie
    popSlider.value = this.value;
    gamma = this.value;
    if(this.value != 0)
        rk4sir();
}
popSlider.oninput = function() {
    localStorage.setItem("popValue", this.value);           // Cookie
    popForm.value = this.value;
    gamma = this.value;
    rk4sir();
}

// Remembers last population value using cookie
popCookie = localStorage.getItem("popValue");          
popForm.value = popCookie;
popSlider.value = popCookie;

// Initial Susceptible, S0
tranForm.oninput = function() {
    tranSlider.value = this.value;
    S0 = parseFloat(this.value);
    rk4sir();
}
tranSlider.oninput = function() {
    tranForm.value = this.value;
    S0 = parseFloat(this.value);
    rk4sir();
}

// Initial infected
infForm.oninput = function() {
    infSlider.value = this.value;
    I0 = parseFloat(this.value);          // parseFloat converts it from a string to number
    rk4sir();
}
infSlider.oninput = function() {
    infForm.value = this.value;
    I0 = parseFloat(this.value);
    rk4sir();
}

// Initial Removed
recForm.oninput = function() {
    recSlider.value = this.value;
    R0 = parseFloat(this.value);          // parseFloat converts it from a string to number
    rk4sir();
}
recSlider.oninput = function() {
    recForm.value = this.value;
    R0 = parseFloat(this.value);
    rk4sir();
}

// Step size
stepForm.oninput = function() {
    stepSlider.value = this.value;
    h = parseFloat(this.value);          // parseFloat converts it from a string to number
    rk4sir();
}
stepSlider.oninput = function() {
    stepForm.value = this.value;
    h = parseFloat(this.value);
    rk4sir();
}

// Total step size
totalStepForm.oninput = function() {
    TotalstepSlider.value = this.value;
    steps = parseFloat(this.value);          // parseFloat converts it from a string to number
    rk4sir();
}
totalStepSlider.oninput = function() {
    totalStepForm.value = this.value;
    steps = parseFloat(this.value);
    rk4sir();
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

    resetFormSliders();
    rk4sir();
}

function resetFormSliders() {
    reproForm.value = beta;
    reproSlider.value = beta;
    popForm.value = gamma;
    popSlider.value = gamma;
    tranForm.value = S0;
    tranSlider.value = S0;
    infForm.value = I0;
    infSlider.value = I0;
    recForm.value = R0;
    recSlider.value = R0;
    stepForm.value = h;
    stepSlider.value = h;
    totalStepForm.value = steps;
    totalStepSlider.value = steps;
}

function resetGraph() {
    beta = 0.025;
    gamma = 0.0006;
    S0 = 99000;
    I0 = 1000;
    R0 = 0;
    h = 0.1;
    steps = 10000;
    N = S0 + I0 + R0;
    dataS = [S0];
    dataI = [I0];
    dataR = [R0];
    tArr = [0];

    resetFormSliders();
    rk4sir();
}

let beta = 0.025,
    gamma = 0.0006,
    S0 = 99000,
    I0 = 1000,
    R0 = 0,
    h = 0.1,                 // Stepsize
    steps = 10000,           // Total steps

    N = S0 + I0 + R0,
    dataS = [S0],
    dataI = [I0],
    dataR = [R0],
    tArr = [0];

function rk4sir(){
    console.log("Start: rk4sir");                
    
    N = S0 + I0 + R0;       // Total population
    totalN.innerHTML = N;

    dataS = [S0];
    dataI = [I0];
    dataR = [R0];
    tArr = [0];
    
    function fS(S, I){
        return -(beta*I*S)/N;
    }
    
    function fI(S, I){
        return beta*I*S/N - gamma*I;
    }
    
    function fR(I){
        return gamma*I;
    }

    for (i = 1; i <= steps; i++){
        let Sk1 = fS(dataS[i-1], dataI[i-1]),
            Sk2 = fS(dataS[i-1] + h/2*Sk1, dataI[i-1] + h/2*Sk1),
            Sk3 = fS(dataS[i-1] + h/2*Sk2, dataI[i-1] + h/2*Sk2),
            Sk4 = fS(dataS[i-1] + h*Sk3, dataI[i-1] + h*Sk3),
            Ik1 = fI(dataS[i-1], dataI[i-1]),
            Ik2 = fI(dataS[i-1] + h/2*Ik1, dataI[i-1] + h/2*Ik1),
            Ik3 = fI(dataS[i-1] + h/2*Ik2, dataI[i-1] + h/2*Ik2),
            Ik4 = fI(dataS[i-1] + h*Ik3, dataI[i-1] + h*Ik3),
            Rk1 = fR(dataI[i-1]),
            Rk2 = fR(dataI[i-1] + h/2*Rk1),
            Rk3 = fR(dataI[i-1] + h/2*Rk2),
            Rk4 = fR(dataI[i-1] + h*Rk3);
            
        tArr[i] = (i*h).toFixed(1);
        
        dataS.push(dataS[i-1] + (Sk1 + 2*(Sk2 + Sk3) + Sk4)*h/6);
        dataI.push(dataI[i-1] + (Ik1 + 2*(Ik2 + Ik3) + Ik4)*h/6);
        dataR.push(dataR[i-1] + (Rk1 + 2*(Rk2 + Rk3) + Rk4)*h/6);
    }
    
    myChart.data.labels = tArr;
    myChart.data.datasets[0].data = dataS;
    myChart.data.datasets[1].data = dataI;
    myChart.data.datasets[2].data = dataR;
    myChart.update();
    console.log("End: rk4sir");
}

// Initialiserer graf
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xArr,
        datasets: [
        {
            label: "Susceptible individuals",
            data: dataS,
            borderColor: "blue",
        },
        {
            label: "Infectious individuals",
            data: dataI,
            borderColor: "red",
        },
        {
            label: "Removed or deceased individuals",
            data: dataR,
            borderColor: "green",
        }
    ]
    },
    options: {
        responsive: true,
        title: {
            display: false,
            text: "Epidemiological Modelling",
            position: "top",
            fontSize: 50,
            fontColor: "black",
            lineHeight: 2,
        },
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    
                }
            }]
        },
        maintainAspectRatio: false,
        animation: {
            duration: 10
        },
        elements: {
            line: {
                borderWidth: 5,
                lineTension: 0,
                fill: false,
            },
            point: {
                pointStyle: "circle",
                rotation: 0,
                radius: 0,
                hoverRadius: 7,
            },
        },
    },
});

rk4sir();

function updateGraph() {
    console.log("Updating chart.")
    myChart.update();
}
