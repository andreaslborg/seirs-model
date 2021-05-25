let comparisonBox = document.getElementById("comparisonBox");

// Calculates the data points and updates the website
function runGraph() {
    fixedPopulation();
    rk4seirs();
    updateInfo();
    resizeArr();
    errorCheck();
    seirsChart.update();
}

// Function to calculate total population and S0, depending on the checkbox "Fixed Population"
function fixedPopulation() {
    if (checkboxFixPop.checked == 1) {
        parameterObj.N = parseFloat(localStorage.getItem("S0Value"));
        parameterObj.S0 = parameterObj.N - parameterObj.E0 - parameterObj.I0 - parameterObj.R0;
        
        S0TitelDes();
        sliderInputValidation();

    } else { 
        parameterObj.S0 = parseFloat(localStorage.getItem("S0Value"));
        parameterObj.N = parameterObj.S0 + parameterObj.E0 + parameterObj.I0 + parameterObj.R0;

        S0TitelDes();
        sliderInputValidation();
    }
}

function sliderInputValidation() {
    if (checkboxFixPop.checked == 1) {
        S0Slider.min = parameterObj.E0+parameterObj.I0+parameterObj.R0;
        E0Slider.max = parameterObj.N-parameterObj.I0-parameterObj.R0;
        I0Slider.max = parameterObj.N-parameterObj.E0-parameterObj.R0;
        R0Slider.max = parameterObj.N-parameterObj.I0-parameterObj.E0;

        localStorage.setItem("checkboxFixPopValue", 1)
    } else {
        E0Slider.max = 100000;
        I0Slider.max = 100000;
        R0Slider.max = 100000;
        
        localStorage.setItem("checkboxFixPopValue", 0);
    }
}

// Changes the desription of the total population box depending on whether or not "fixed population" is checked
function S0TitelDes() {
    if (checkboxFixPop.checked == 1) {
        S0Title.innerHTML = `Total Population (N)`;
        S0Des.innerHTML = `S<span class="sub">0</span> = ` + parameterObj.S0;
    } else {
        S0Title.innerHTML = `Initial Susceptible (S<span class="sub">0</span>)`;
        S0Des.innerHTML = `Amount of people who are susceptible to the disease.`;
    }
}

// Performs simulations with the SEIRS model using RK4
function rk4seirs() {
    let Sk1,
        Sk2,
        Sk3,
        Sk4,
        Ek1,
        Ek2,
        Ek3,
        Ek4,
        Ik1,
        Ik2,
        Ik3,
        Ik4,
        Rk1,
        Rk2,
        Rk3,
        Rk4;
    
    dataObj.dataS = [parameterObj.S0];
    dataObj.dataE = [parameterObj.E0];
    dataObj.dataI = [parameterObj.I0];
    dataObj.dataR = [parameterObj.R0];
    dataObj.tArr = [0];

    dataObj.totalSteps = daysToSteps(parameterObj.days);
    
    // SEIRS functions 
    function fS(S, I, R) { 
        return -(parameterObj.beta*S*I)/parameterObj.N + parameterObj.epsilon*R; 
    }
    function fE(S, E, I) { 
        return (parameterObj.beta*S*I)/parameterObj.N - parameterObj.sigma*E; 
    }
    function fI(E, I) { 
        return parameterObj.sigma*E - parameterObj.gamma*I; 
    }
    function fR(I, R) { 
        return parameterObj.gamma*I - parameterObj.epsilon*R; 
    }

    // Input validation so the website doesn't crash 
    if (dataObj.totalSteps > 1000000) {
        return;
    } else {
        // RK4
        for (i = 1; i <= dataObj.totalSteps; i++) {
            Sk1 = fS(dataObj.dataS[i-1], dataObj.dataI[i-1], dataObj.dataR[i-1]);
            Sk2 = fS(dataObj.dataS[i-1] + stepSize/2*Sk1, dataObj.dataI[i-1] + stepSize/2*Sk1, dataObj.dataR[i-1] + stepSize/2*Sk1);
            Sk3 = fS(dataObj.dataS[i-1] + stepSize/2*Sk2, dataObj.dataI[i-1] + stepSize/2*Sk2, dataObj.dataR[i-1] + stepSize/2*Sk2);
            Sk4 = fS(dataObj.dataS[i-1] + stepSize*Sk3, dataObj.dataI[i-1] + stepSize*Sk3, dataObj.dataR[i-1] + stepSize*Sk3);

            Ek1 = fE(dataObj.dataS[i-1], dataObj.dataE[i-1], dataObj.dataI[i-1]);
            Ek2 = fE(dataObj.dataS[i-1] + stepSize/2*Ek1, dataObj.dataE[i-1] + stepSize/2*Ek1, dataObj.dataI[i-1] + stepSize/2*Ek1);
            Ek3 = fE(dataObj.dataS[i-1] + stepSize/2*Ek2, dataObj.dataE[i-1] + stepSize/2*Ek2, dataObj.dataI[i-1] + stepSize/2*Ek2);
            Ek4 = fE(dataObj.dataS[i-1] + stepSize*Ek3, dataObj.dataE[i-1] + stepSize*Ek3, dataObj.dataI[i-1] + stepSize*Ek3);

            Ik1 = fI(dataObj.dataE[i-1], dataObj.dataI[i-1]);
            Ik2 = fI(dataObj.dataE[i-1] + stepSize/2*Ik1, dataObj.dataI[i-1] + stepSize/2*Ik1);
            Ik3 = fI(dataObj.dataE[i-1] + stepSize/2*Ik2, dataObj.dataI[i-1] + stepSize/2*Ik2);
            Ik4 = fI(dataObj.dataE[i-1] + stepSize*Ik3, dataObj.dataI[i-1] + stepSize*Ik3);

            Rk1 = fR(dataObj.dataI[i-1], dataObj.dataR[i-1]);
            Rk2 = fR(dataObj.dataI[i-1] + stepSize/2*Rk1, dataObj.dataR[i-1] + stepSize/2*Rk1);
            Rk3 = fR(dataObj.dataI[i-1] + stepSize/2*Rk2, dataObj.dataR[i-1] + stepSize/2*Rk2);
            Rk4 = fR(dataObj.dataI[i-1] + stepSize*Rk3, dataObj.dataR[i-1] + stepSize*Rk3);
                
            dataObj.tArr[i] = (i*stepSize);
            
            dataObj.dataS.push(dataObj.dataS[i-1] + (Sk1 + 2*(Sk2 + Sk3) + Sk4)*stepSize/6);
            dataObj.dataE.push(dataObj.dataE[i-1] + (Ek1 + 2*(Ek2 + Ek3) + Ek4)*stepSize/6);
            dataObj.dataI.push(dataObj.dataI[i-1] + (Ik1 + 2*(Ik2 + Ik3) + Ik4)*stepSize/6);
            dataObj.dataR.push(dataObj.dataR[i-1] + (Rk1 + 2*(Rk2 + Rk3) + Rk4)*stepSize/6);
        }
    }
}

// Updates the information table and total steps in "days" box
function updateInfo() {
    totalN.innerHTML = parameterObj.N;

    peakInfected = findMax(dataObj.dataI);
    peakInfPercent = ((peakInfected / parameterObj.N) * 100).toFixed(2) + "%";
    peakInfectedDate = stepsToDays(dataObj.dataI.indexOf(peakInfected));
    maxInf.innerHTML = peakInfected.toFixed(0) + " at " + peakInfectedDate + " days";
    maxInfPer.innerHTML = peakInfPercent;

    peakExposed = findMax(dataObj.dataE);
    peakExpPercent = ((peakExposed / parameterObj.N) * 100).toFixed(2) + "%";
    peakExposedDate = stepsToDays(dataObj.dataE.indexOf(peakExposed));
    maxExp.innerHTML = peakExposed.toFixed(0) + " at " + peakExposedDate + " days";
    maxExpPer.innerHTML = peakExpPercent;
    
    totalStepsDes.innerText = "Total steps = " + dataObj.totalSteps;
}

// Resizes the arrays that are plotted on the chart to 100 elements
function resizeArr() {
    dataObj.newtArr = [];
    dataObj.newdataS = [];
    dataObj.newdataE = [];
    dataObj.newdataI = [];
    dataObj.newdataR = [];
    
    let stepsToSkip;
    
    if (dataObj.dataS.length > 100) {
        stepsToSkip = (dataObj.dataS.length/100);

        for(i = 0; i < 100; i++) {
            dataObj.newtArr.push(dataObj.tArr[(i*stepsToSkip).toFixed(0)].toFixed(0));
            dataObj.newdataS.push(dataObj.dataS[(i*stepsToSkip).toFixed(0)]);
            dataObj.newdataE.push(dataObj.dataE[(i*stepsToSkip).toFixed(0)]);
            dataObj.newdataI.push(dataObj.dataI[(i*stepsToSkip).toFixed(0)]);
            dataObj.newdataR.push(dataObj.dataR[(i*stepsToSkip).toFixed(0)]);
        }
        seirsChart.data.labels = dataObj.newtArr;
        seirsChart.data.datasets[0].data = dataObj.newdataS;
        seirsChart.data.datasets[1].data = dataObj.newdataE;
        seirsChart.data.datasets[2].data = dataObj.newdataI;
        seirsChart.data.datasets[3].data = dataObj.newdataR;

    } else { 
        seirsChart.data.labels = dataObj.tArr;
        seirsChart.data.datasets[0].data = dataObj.dataS;
        seirsChart.data.datasets[1].data = dataObj.dataE;
        seirsChart.data.datasets[2].data = dataObj.dataI;
        seirsChart.data.datasets[3].data = dataObj.dataR;
    }
}

// Adds or removes the comparison graph depending on the checkbox
function comparisonGraph() {
    if (comparisonBox.checked == 1) {
        addComparisonGraph();
    } else {
        removeComparisonGraph();
    }
}

// Adds the comparison graph
function addComparisonGraph() {
    let comparisondataS = dataObj.newdataS,
        comparisondataE = dataObj.newdataE,
        comparisondataI = dataObj.newdataI,
        comparisondataR = dataObj.newdataR;

    seirsChart.data.datasets[4].data = comparisondataS;
    seirsChart.data.datasets[5].data = comparisondataE;
    seirsChart.data.datasets[6].data = comparisondataI;
    seirsChart.data.datasets[7].data = comparisondataR;

    seirsChart.update();
}

// Removes the comparison graph
function removeComparisonGraph() {
    comparisonBox.checked = 0;

    seirsChart.data.datasets[4].data = [];
    seirsChart.data.datasets[5].data = [];
    seirsChart.data.datasets[6].data = [];
    seirsChart.data.datasets[7].data = [];

    seirsChart.update();
}

// Finds the highest value in an array
function findMax(arr) {
    let max = 0;

    for(i=0; i < arr.length; i++){
        if(arr[i] > max)
            max = arr[i];
    }
    return max;
}