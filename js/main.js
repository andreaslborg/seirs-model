const stepSize = 0.01;
const stepsToDays = function(steps) { return steps / 100; } 
const daysToSteps = function(days) { return days * 100; }

let parameterObj = {
    N: 0,
    S0: 0,
    E0: 0,
    I0: 0,
    R0: 0,
    beta: 0,
    sigma: 0,
    gamma: 0,
    epsilon: 0,
    days: 0,
    checkboxFixPopValue: 0
};

let dataObj = {
    totalSteps: 0,
    dataS: [],
    dataE: [],
    dataI: [],
    dataR: [],
    tArr: [],
    newtArr: [],
    newdataS: [],
    newdataE: [],
    newdataI: [],
    newdataR: []
};

checkVisit();

let filenameArr = JSON.parse(localStorage.getItem("filenameArrCookie")),
    dateArr = JSON.parse(localStorage.getItem("dateArrCookie")),
    peakInfArr = JSON.parse(localStorage.getItem("peakInfArrCookie")),
    peakExpArr = JSON.parse(localStorage.getItem("peakExpArrCookie")),
    parametersArr = JSON.parse(localStorage.getItem("parametersArrCookie"));

updateParameters();

// Initialisation of graph 
let chart = document.getElementById("seirsChart").getContext('2d'),
    seirsChart = new Chart(chart, {
        type: "line",
        data: {
            labels: dataObj.tArr,
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