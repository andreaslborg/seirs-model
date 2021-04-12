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

// Recovery time
let recForm = document.getElementById("recForm1");
let recSlider = document.getElementById("recSlider1");

// Initiate x axis
for(let i = 0; i < 2000; i++) {
    xArr[i] = i;
}

// Update x axis
xSlider.oninput = function() {
    xArr.length = 0;
    for(let i = 0; i < this.value; i++){
        xArr[i] = i;
    }
    updateGraph();
}

// Update the current input value (each time you type in it)
reproForm.oninput = function() {
    reproSlider.value = this.value;
    beta = this.value;
    rk4sir();
}

// Update the current slider value (each time you drag the slider handle)
reproSlider.oninput = function() {
    reproForm.value = this.value;
    beta = this.value;
    rk4sir();
    localStorage.setItem("reproValue", this.value);
}

// Remembers last reproction value using cookie
reproCookie = localStorage.getItem("reproValue");
reproForm.value = reproCookie;
reproSlider.value = reproCookie;
console.log("Reproduction value = " + reproCookie);

// Population
popForm.oninput = function() {
    popSlider.value = this.value;
    gamma = this.value;
    console.log("Gamma form input");
    if(this.value != 0)
        rk4sir();
}
popSlider.oninput = function() {
    popForm.value = this.value;
    gamma = this.value;
    rk4sir();
}

// Transmission
tranForm.oninput = function() {
    tranSlider.value = this.value;

}
tranSlider.oninput = function() {
    tranForm.value = this.value;

}

// Start infected
recForm.oninput = function() {
    recSlider.value = this.value;
    dataI = this.value;
    rk4sir();
}
recSlider.oninput = function() {
    recForm.value = this.value;
    dataI = this.value;
    rk4sir();
}

let beta = 0.025,
    gamma = 0.0006,
    S0 = 99000,
    I0 = 1000,
    R0 = 0,
    h = 0.1,
    steps = 2001,

    N = S0 + I0 + R0,
    dataS = [S0],
    dataI = [I0],
    dataR = [R0];

function rk4sir(){
    S0 = 99000,
    I0 = 1000,
    R0 = 0,
    h = 0.1,
    steps = 2001,
    N = S0 + I0 + R0,
    dataS = [S0],
    dataI = [I0],
    dataR = [R0];

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
            Rk4 = fR(dataI[i-1] + h*Rk3),
            t = i*h;

        dataS.push(dataS[i-1] + (Sk1 + 2*(Sk2 + Sk3) + Sk4)/6);
        dataI.push(dataI[i-1] + (Ik1 + 2*(Ik2 + Ik3) + Ik4)/6);
        dataR.push(dataR[i-1] + (Rk1 + 2*(Rk2 + Rk3) + Rk4)/6);
    }
    myChart.data.datasets[0].data = dataS;
    myChart.data.datasets[1].data = dataI;
    myChart.data.datasets[2].data = dataR;
    myChart.update();
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
                    //stepSize: 1
                }
            }]
        },
        maintainAspectRatio: false,
        animation: {
            duration: 100
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
