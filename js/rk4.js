let comparisonBox = document.getElementById("comparisonBox");

// Calculates the data points and updates the website
function runGraph() {
    fixedPopulation();
    rk4seirs();
    updateInfo();
    resizeArr();
    seirsChart.update();
}

// Function to calculate total population and S0, depending on the checkbox "Fixed Population"
function fixedPopulation() {
    if (checkboxFixPop.checked == 1) {
        N = parseFloat(localStorage.getItem("S0Value"));
        S0 = N - E0 - I0 - R0;
        
        S0TitelDes();
        sliderInputValidation();

    } else { 
        S0 = parseFloat(localStorage.getItem("S0Value"));
        N = S0 + E0 + I0 + R0;

        S0TitelDes();
        sliderInputValidation();
    }
}

function sliderInputValidation() {
    if (checkboxFixPop.checked == 1) {
        S0Slider.min = E0+I0+R0;
        E0Slider.max = N-I0-R0;
        I0Slider.max = N-E0-R0;
        R0Slider.max = N-I0-E0;
        
        let sumEIR = E0+I0+R0;
        errorMessage.innerHTML = errorCheck(sumEIR);

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
        S0Des.innerHTML = `S<span class="sub">0</span> = ` + S0;
    } else {
        S0Title.innerHTML = `Initial Susceptible (S<span class="sub">0</span>)`;
        S0Des.innerHTML = `Amount of people who are susceptible to the disease.`;
        errorMessage.innerHTML = "";
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
    
    dataS = [S0];
    dataE = [E0];
    dataI = [I0];
    dataR = [R0];
    tArr = [0];

    totalSteps = daysToSteps(days);
    
    // SEIRS functions 
    function fS(S, I, R){ return -(beta*S*I)/N + epsilon*R; }
    function fE(S, E, I){ return (beta*S*I)/N - sigma*E; }
    function fI(E, I)   { return sigma*E - gamma*I; }
    function fR(I, R)   { return gamma*I - epsilon*R; }

    // Input validation so the website doesn't crash 
    if (totalSteps > 1000000) {
        errorMessage.innerHTML = "Due to reliability, the max days is 10000.";
    } else if (totalSteps < 0) {
        errorMessage.innerHTML = "Days can not be a negative number.";
    } else {
        // RK4
        for (i = 1; i <= totalSteps; i++){
            Sk1 = fS(dataS[i-1], dataI[i-1], dataR[i-1]);
            Sk2 = fS(dataS[i-1] + stepSize/2*Sk1, dataI[i-1] + stepSize/2*Sk1, dataR[i-1] + stepSize/2*Sk1);
            Sk3 = fS(dataS[i-1] + stepSize/2*Sk2, dataI[i-1] + stepSize/2*Sk2, dataR[i-1] + stepSize/2*Sk2);
            Sk4 = fS(dataS[i-1] + stepSize*Sk3, dataI[i-1] + stepSize*Sk3, dataR[i-1] + stepSize*Sk3);

            Ek1 = fE(dataS[i-1], dataE[i-1], dataI[i-1]);
            Ek2 = fE(dataS[i-1] + stepSize/2*Ek1, dataE[i-1] + stepSize/2*Ek1, dataI[i-1] + stepSize/2*Ek1);
            Ek3 = fE(dataS[i-1] + stepSize/2*Ek2, dataE[i-1] + stepSize/2*Ek2, dataI[i-1] + stepSize/2*Ek2);
            Ek4 = fE(dataS[i-1] + stepSize*Ek3, dataE[i-1] + stepSize*Ek3, dataI[i-1] + stepSize*Ek3);

            Ik1 = fI(dataE[i-1], dataI[i-1]);
            Ik2 = fI(dataE[i-1] + stepSize/2*Ik1, dataI[i-1] + stepSize/2*Ik1);
            Ik3 = fI(dataE[i-1] + stepSize/2*Ik2, dataI[i-1] + stepSize/2*Ik2);
            Ik4 = fI(dataE[i-1] + stepSize*Ik3, dataI[i-1] + stepSize*Ik3);

            Rk1 = fR(dataI[i-1], dataR[i-1]);
            Rk2 = fR(dataI[i-1] + stepSize/2*Rk1, dataR[i-1] + stepSize/2*Rk1);
            Rk3 = fR(dataI[i-1] + stepSize/2*Rk2, dataR[i-1] + stepSize/2*Rk2);
            Rk4 = fR(dataI[i-1] + stepSize*Rk3, dataR[i-1] + stepSize*Rk3);
                
            tArr[i] = (i*stepSize);
            
            dataS.push(dataS[i-1] + (Sk1 + 2*(Sk2 + Sk3) + Sk4)*stepSize/6);
            dataE.push(dataE[i-1] + (Ek1 + 2*(Ek2 + Ek3) + Ek4)*stepSize/6);
            dataI.push(dataI[i-1] + (Ik1 + 2*(Ik2 + Ik3) + Ik4)*stepSize/6);
            dataR.push(dataR[i-1] + (Rk1 + 2*(Rk2 + Rk3) + Rk4)*stepSize/6);
        }
    }
}

// Updates the information table and total steps in "days" box
function updateInfo() {
    totalN.innerHTML = N;

    peakInfected = findMax(dataI);
    peakInfPercent = ((peakInfected / N) * 100).toFixed(2) + "%";
    peakInfectedDate = stepsToDays(dataI.indexOf(peakInfected));
    maxInf.innerHTML = peakInfected.toFixed(0) + " at " + peakInfectedDate + " days";
    maxInfPer.innerHTML = peakInfPercent;

    peakExposed = findMax(dataE);
    peakExpPercent = ((peakExposed / N) * 100).toFixed(2) + "%";
    peakExposedDate = stepsToDays(dataE.indexOf(peakExposed));
    maxExp.innerHTML = peakExposed.toFixed(0) + " at " + peakExposedDate + " days";
    maxExpPer.innerHTML = peakExpPercent;
    
    totalStepsDes.innerText = "Total steps = " + totalSteps;
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

// Resizes the arrays to 100 elements
function resizeArr() {
    newtArr = [];
    newdataS = [];
    newdataE = [];
    newdataI = [];
    newdataR = [];
    
    let stepsToSkip;
    
    if (dataS.length > 100) {
        stepsToSkip = (dataS.length/100);

        for(i = 0; i < 100; i++) {
            newtArr.push(tArr[(i*stepsToSkip).toFixed(0)].toFixed(0));
            newdataS.push(dataS[(i*stepsToSkip).toFixed(0)]);
            newdataE.push(dataE[(i*stepsToSkip).toFixed(0)]);
            newdataI.push(dataI[(i*stepsToSkip).toFixed(0)]);
            newdataR.push(dataR[(i*stepsToSkip).toFixed(0)]);
        }
        seirsChart.data.labels = newtArr;
        seirsChart.data.datasets[0].data = newdataS;
        seirsChart.data.datasets[1].data = newdataE;
        seirsChart.data.datasets[2].data = newdataI;
        seirsChart.data.datasets[3].data = newdataR;

    } else { 
        seirsChart.data.labels = tArr;
        seirsChart.data.datasets[0].data = dataS;
        seirsChart.data.datasets[1].data = dataE;
        seirsChart.data.datasets[2].data = dataI;
        seirsChart.data.datasets[3].data = dataR;
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
    let comparisondataS = newdataS,
        comparisondataE = newdataE,
        comparisondataI = newdataI,
        comparisondataR = newdataR;

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

function responseTime(){
    /*
    let startTime = new Date();
    let startMin = startTime.getMinutes();  
    let startSec = startTime.getSeconds();
    let startMiliSec = startTime.getMilliseconds();

    let endTime = new Date();
    let endMin = endTime.getMinutes();  
    let endSec = endTime.getSeconds();
    let endMiliSec = endTime.getMilliseconds();
    
    //Compare start and end time 
    const mintomilisec = 60000;
    const sectomilisec = 1000;

    let responeTimeMilisec = (endMin*mintomilisec+endSec*sectomilisec+endMiliSec) - (startMin*mintomilisec+startSec*sectomilisec+startMiliSec);

    console.log("Response time: " + responeTimeMilisec);
    */
}