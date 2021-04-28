/* Checks if the user has visited the site before setting varibles */
checkVisit();

/* Loads all the values from the cookies */
allCookies();

function fixedPopulation() {
    console.log("Fixed Population");

    let checkboxFixPop = document.getElementById("fixedPopulation");
    let S0Title = document.getElementById("S0Title");
    let S0Des = document.getElementById("S0Des");
    
    if (checkboxFixPop.checked == true) {
        S0Title.innerHTML = `Total Population`;
        S0Des.innerHTML = `The total population, dependent of the initial E<span class="sub">0</span>, I<span class="sub">0</span>, R<span class="sub">0</span>.`;
    } else {
        S0Title.innerHTML = `Initial Susceptible (S<span class="sub">0</span>)`;
        S0Des.innerHTML = `Amount of people who are susceptible to the disease.`;
    }

    console.log(checkboxFixPop.checked);

}

let beta = betaCookie,
    gamma = gammaCookie,
    epsilon = epsilonCookie,
    sigma = sigmaCookie,
    S0 = S0Cookie,
    E0 = E0Cookie,
    I0 = I0Cookie,
    R0 = R0Cookie,
    h = stepCookie,             // Stepsize
    steps = totalStepCookie,    // Total steps
    N = S0 + E0 + I0 + R0,
    dataS = [S0],
    dataE = [E0],
    dataI = [I0],
    dataR = [R0],
    tArr = [0];

/* Executed by the reset button */
function resetGraph() {
    console.log("Resetting parameters");

    beta = 2.2;
    gamma = 0.33333;
    epsilon = 0.07142;
    sigma = 0.1428;
    S0 = 199;
    E0 = 0;
    I0 = 1;
    R0 = 0;
    h = 0.01;
    steps = 10000;
    N = S0 + E0 + I0 + R0;
    dataS = [S0];
    dataE = [E0];
    dataI = [I0];
    dataR = [R0];
    tArr = [0];

    console.log(beta);

    setCookieValues();
    setFormSliders();
    rk4seirs();
}

function rk4seirs(){
    console.log("Start: rk4seirs");

    N = S0 + E0 + I0 + R0;       // Total population
    dataS = [S0];
    dataE = [E0];   
    dataI = [I0];
    dataR = [R0];
    tArr = [0];
    
    function fS(S, I, R){
        return -(beta*S*I)/N + epsilon*R;
    }

    function fE(S, E, I){
        return (beta*S*I)/N - sigma*E;
    }
    
    function fI(E, I){
        return sigma*E - gamma*I;
    }
    
    function fR(I, R){
        return gamma*I - epsilon*R;
    }

    for (i = 1; i <= steps; i++){
        let Sk1 = fS(dataS[i-1], dataI[i-1], dataR[i-1]),
            Sk2 = fS(dataS[i-1] + h/2*Sk1, dataI[i-1] + h/2*Sk1, dataR[i-1] + h/2*Sk1),
            Sk3 = fS(dataS[i-1] + h/2*Sk2, dataI[i-1] + h/2*Sk2, dataR[i-1] + h/2*Sk2),
            Sk4 = fS(dataS[i-1] + h*Sk3, dataI[i-1] + h*Sk3, dataR[i-1] + h*Sk3),

            Ek1 = fE(dataS[i-1], dataE[i-1], dataI[i-1]),
            Ek2 = fE(dataS[i-1] + h/2*Ek1, dataE[i-1] + h/2*Ek1, dataI[i-1] + h/2*Ek1),
            Ek3 = fE(dataS[i-1] + h/2*Ek2, dataE[i-1] + h/2*Ek2, dataI[i-1] + h/2*Ek2),
            Ek4 = fE(dataS[i-1] + h*Ek3, dataE[i-1] + h*Ek3, dataI[i-1] + h*Ek3),

            Ik1 = fI(dataE[i-1], dataI[i-1]),
            Ik2 = fI(dataE[i-1] + h/2*Ik1, dataI[i-1] + h/2*Ik1),
            Ik3 = fI(dataE[i-1] + h/2*Ik2, dataI[i-1] + h/2*Ik2),
            Ik4 = fI(dataE[i-1] + h*Ik3, dataI[i-1] + h*Ik3),

            Rk1 = fR(dataI[i-1], dataR[i-1]),
            Rk2 = fR(dataI[i-1] + h/2*Rk1, dataR[i-1] + h/2*Rk1),
            Rk3 = fR(dataI[i-1] + h/2*Rk2, dataR[i-1] + h/2*Rk2),
            Rk4 = fR(dataI[i-1] + h*Rk3, dataR[i-1] + h*Rk3);
            
        tArr[i] = (i*h).toFixed(2);
        
        dataS.push(dataS[i-1] + (Sk1 + 2*(Sk2 + Sk3) + Sk4)*h/6);
        dataE.push(dataE[i-1] + (Ek1 + 2*(Ek2 + Ek3) + Ek4)*h/6);
        dataI.push(dataI[i-1] + (Ik1 + 2*(Ik2 + Ik3) + Ik4)*h/6);
        dataR.push(dataR[i-1] + (Rk1 + 2*(Rk2 + Rk3) + Rk4)*h/6);
    }

    /* Sets N as the total population in the info table */
    totalN.innerHTML = N;
    
    /* Finds the highest number (peak infected) in the dataI array and puts in into the info table */
    let peakInfected = Math.max(...dataI).toFixed(0);
    let peakInfectedDate = dataI.indexOf(Math.max(...dataI)) / 100;
    maxInf.innerHTML = peakInfected + " at day " + peakInfectedDate;

    /* Finds the highest number (peak exposed) in the dataE array and puts in into the info table */
    let peakExposed = Math.max(...dataE).toFixed(0);
    let peakExposedDate = dataE.indexOf(Math.max(...dataE)) / 100;
    maxExp.innerHTML = peakExposed + " at day " + peakExposedDate;

    seirsChart.data.labels = tArr;
    seirsChart.data.datasets[0].data = dataS;
    seirsChart.data.datasets[1].data = dataE;
    seirsChart.data.datasets[2].data = dataI;
    seirsChart.data.datasets[3].data = dataR;
    seirsChart.update();

    console.log("End: rk4seirs");
}

/* Initializes graph */
var ctx = document.getElementById("seirsChart").getContext('2d');
var seirsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: tArr,
        datasets: [
        {
            label: "Susceptible individuals",
            data: dataS,
            borderColor: "blue",
        },
        {
            label: "Exposed individuals",
            data: dataE,
            borderColor: "orange",
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
        }]
    },
    options: {
        responsive: true,
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    minRotation: 0,
                    stepSize: 5,
                },
                scaleLabel: {
                    display: true,
                    labelString: "Days"
                },
                autoskip: true
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Individuals"
                }
            }]
        },
        maintainAspectRatio: false,
        animation: {
            duration: 0
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

rk4seirs();

function updateGraph() {
    console.log("Updating chart.")
    seirsChart.update();
}