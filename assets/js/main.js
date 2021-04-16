/* Checks if the user has visited the site before setting varibles */
checkVisit();

/* Loads all the values from the cookies */
allCookies();

function fixedPopulation() {
    console.log("Fixed Population");

}

let beta = transCookie,
    gamma = remCookie,
    S0 = S0Cookie,
    I0 = I0Cookie,
    R0 = R0Cookie,
    h = stepCookie,             // Stepsize
    steps = totalStepCookie,    // Total steps
    N = S0 + I0 + R0,
    dataS = [S0],
    dataE = [],
    dataI = [I0],
    dataR = [R0],
    tArr = [0];

/* Executed by the reset button */
function resetGraph() {
    console.log("Resetting parameters");
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

    setCookieValues();
    setFormSliders();
    rk4sir();
}

function rk4sir(){
    console.log("Start: rk4sir");                
    
    N = S0 + I0 + R0;       // Total population
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
        dataE.push((dataI[i-1] + (Sk1 + 2*(Sk2 + Sk3) + Sk4)*h/6)/2);
        dataI.push(dataI[i-1] + (Ik1 + 2*(Ik2 + Ik3) + Ik4)*h/6);
        dataR.push(dataR[i-1] + (Rk1 + 2*(Rk2 + Rk3) + Rk4)*h/6);
    }

    /* Sets N as the total population in the info table */
    totalN.innerHTML = N;
    
    /* Finds the highest number (peak infected) in the dataI array and puts in into the info table */
    let peakInfected = Math.max(...dataI).toFixed(0);
    let peakInfectedDate = dataI.indexOf(Math.max(...dataI));
    maxInf.innerHTML = peakInfected + " at day " + peakInfectedDate;
    
    myChart.data.labels = tArr;
    myChart.data.datasets[0].data = dataS;
    myChart.data.datasets[1].data = dataE;
    myChart.data.datasets[2].data = dataI;
    myChart.data.datasets[3].data = dataR;
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

rk4sir();

function updateGraph() {
    console.log("Updating chart.")
    myChart.update();
}