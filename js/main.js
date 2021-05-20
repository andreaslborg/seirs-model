const stepSize = 0.01;
const stepsToDays = function(steps) { return steps / 100; } 
const daysToSteps = function(days) { return days * 100; }

let beta,
    gamma,
    epsilon,
    sigma,
    S0,
    E0,
    I0,
    R0,
    N,
    days,
    totalSteps,
    dataS = [],
    dataE = [],
    dataI = [],
    dataR = [],
    tArr = [],
    newtArr = [],
    newdataS = [],
    newdataE = [],
    newdataI = [],
    newdataR = [];

checkVisit();

updateCookies();

// Initialisation of graph 
let chart = document.getElementById("seirsChart").getContext('2d'),
    seirsChart = new Chart(chart, {
        type: "line",
        data: {
            labels: tArr,
            datasets: [
            {
                label: "Susceptible individuals",
                data: [],
                borderColor: "rgba(0, 0, 255, 1)", 
            },
            {
                label: "Exposed individuals",
                data: [],
                borderColor: "rgb(255, 165, 0, 1)",
            },
            {
                label: "Infectious individuals",
                data: [],
                borderColor: "rgb(255, 0, 0, 1)",
            },
            {
                label: "Removed individuals",
                data: [],
                borderColor: "rgb(0, 128, 0, 1)",
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
            }]
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
    }
);

runGraph();