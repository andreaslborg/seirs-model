/* Checks if the user has visited the site before setting varibles */
checkVisit();

/* Loads all the values from the cookies */
allCookies();

const stepSize = 0.01;
const stepsToDays = function(steps){ return steps / 100; } 
const daysToSteps = function(days) { return days * 100; }

let beta = betaCookie,
    gamma = gammaCookie,
    epsilon = epsilonCookie,
    sigma = sigmaCookie,
    S0 = S0Cookie,
    E0 = E0Cookie,
    I0 = I0Cookie,
    R0 = R0Cookie,
    h = stepSize,
    days = totalStepCookie,
    N = S0 + E0 + I0 + R0,
    dataS = [S0],
    dataE = [E0],
    dataI = [I0],
    dataR = [R0],
    tArr = [0];

function rk4seirs() {
    fixedPopulation();

    dataS = [S0];
    dataE = [E0];   
    dataI = [I0];
    dataR = [R0];
    tArr = [0];
    
    let totalSteps = daysToSteps(days);
    
    /* SEIRS functions */
    function fS(S, I, R){ return -(beta*S*I)/N + epsilon*R; }
    function fE(S, E, I){ return (beta*S*I)/N - sigma*E; }
    function fI(E, I)   { return sigma*E - gamma*I; }
    function fR(I, R)   { return gamma*I - epsilon*R; }

    /* Runge-kutta 4 */
    for (i = 1; i <= totalSteps; i++){
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
            
        tArr[i] = (i*h);
        
        dataS.push(dataS[i-1] + (Sk1 + 2*(Sk2 + Sk3) + Sk4)*h/6);
        dataE.push(dataE[i-1] + (Ek1 + 2*(Ek2 + Ek3) + Ek4)*h/6);
        dataI.push(dataI[i-1] + (Ik1 + 2*(Ik2 + Ik3) + Ik4)*h/6);
        dataR.push(dataR[i-1] + (Rk1 + 2*(Rk2 + Rk3) + Rk4)*h/6);
    }

    /* Updates the total steps description, when the days slider/form is changed */
    totalStepsDes.innerText = "Total steps = " + totalSteps;
    totalN.innerHTML = N;
    
    /* Sets N as the total population in the info table */
    
    /* Finds the max value in an array */
    function findMax(arr){
        let max = 0;

        for(i=0; i < arr.length; i++){
            if(arr[i] > max)
                max = arr[i];
        }
        return max;
    }

    /* Finds the highest number (peak infected) in the dataI array and puts in into the info table */
    //  peakInfected2 = Math.max(...dataI);
    peakInfected = findMax(dataI);
    peakInfPercent = ((peakInfected / N) * 100).toFixed(2) + "%";
    peakInfectedDate = stepsToDays(dataI.indexOf(peakInfected));
    maxInf.innerHTML = peakInfected.toFixed(0) + " at day " + peakInfectedDate + " (" + peakInfPercent + ")";

    /* Finds the highest number (peak exposed) in the dataE array and puts in into the info table */
    //  peakExposed = Math.max(...dataE);
    peakExposed = findMax(dataE);
    peakExpPercent = ((peakExposed / N) * 100).toFixed(2) + "%";
    peakExposedDate = stepsToDays(dataE.indexOf(peakExposed));
    maxExp.innerHTML = peakExposed.toFixed(0) + " at day " + peakExposedDate + " (" + peakExpPercent + ")";

    /* Resizing */
    resizeArr();

    /* Updating the graph */
    seirsChart.update();
}

function resizeArr() {
    let newtArr = [];
    newdataS = [];
    newdataE = [];
    newdataI = [];
    newdataR = [];
    
    let stepsToSkip;
    
    /* Always 100 points from the data array is added to the new array */
    if (dataS.length > 100) 
        stepsToSkip = (dataS.length/100).toFixed(0);
    else
        stepsToSkip = 1;

    for(i = 0; i < dataS.length; i++) {
        if (i % stepsToSkip == 0) {
            newtArr.push(tArr[i].toFixed(0));
            newdataS.push(dataS[i]);
            newdataE.push(dataE[i]);
            newdataI.push(dataI[i]);
            newdataR.push(dataR[i]);
        }
    }
    
    seirsChart.data.labels = newtArr;
    seirsChart.data.datasets[0].data = newdataS;
    seirsChart.data.datasets[1].data = newdataE;
    seirsChart.data.datasets[2].data = newdataI;
    seirsChart.data.datasets[3].data = newdataR;
}

/* Transperant graph to compare */
transBox = document.getElementById("transBox");

function transGraph() {
    if (transBox.checked == 1) {
        let transdataS = newdataS,
            transdataE = newdataE,
            transdataI = newdataI,
            transdataR = newdataR;

        seirsChart.data.datasets[4].data = transdataS;
        seirsChart.data.datasets[5].data = transdataE;
        seirsChart.data.datasets[6].data = transdataI;
        seirsChart.data.datasets[7].data = transdataR;

        seirsChart.update();
    } else {
        removeTransGraphs();
    }
}

function removeTransGraphs() {
    transBox.checked = 0;
    for (i = 4; i < 8; i++) { seirsChart.data.datasets[i].data = []; }
        seirsChart.update();
}


/* Initializes graph */
var ctx = document.getElementById("seirsChart").getContext('2d');
var seirsChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: tArr,
        datasets: [
        {
            label: "Susceptible individuals",
            data: [],
            borderColor: "rgba(0, 0, 255, 1)", // Blue
        },
        {
            label: "Exposed individuals",
            data: [],
            borderColor: "rgb(255, 165, 0, 1)", // Orange
        },
        {
            label: "Infectious individuals",
            data: [],
            borderColor: "rgb(255, 0, 0, 1)", // Red
        },
        {
            label: "Removed individuals\r",
            data: [],
            borderColor: "rgb(0, 128, 0, 1)", // Green
        },
        
        {
            label: "Susceptible individuals",
            data: [],
            borderColor: "rgba(0, 0, 255, 0.1)",
        },
        {
            label: "Exposed individuals",
            data: [],
            borderColor: "rgb(255, 165, 0, 0.1)",
        },
        {
            label: "Infectious individuals",
            data: [],
            borderColor: "rgb(255, 0, 0, 0.1)",
        },
        {
            label: "Removed individuals",
            data: [],
            borderColor: "rgb(0, 128, 0, 0.1)",
        },
        
    ]
    },
    options: {
        responsive: true,
        legend: {
            display: true,
            align: "center",
            labels: {
                boxWidth: 20,
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxRotation: 0,
                    stepSize: 10,
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
                borderWidth: 3,
                lineTension: 0,
                fill: false,
            },
            point: {
                pointStyle: "circle",
                rotation: 0,
                radius: 4,
                hoverRadius: 7,
            },
        },
    },
});

/* Initializes the data when website is opened */
rk4seirs();