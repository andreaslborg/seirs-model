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
for(let i = 0; i < 500; i++) {
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

let chartS = [];
let chartI = [];
let chartR = [];

for(let i = 0; i < xArr.length; i++) {
    //chartS[i] = Math.floor(Math.random() * 101);
    //chartI[i] = Math.floor(Math.random() * 101);
    //chartR[i] = Math.floor(Math.random() * 101);  
}

// Update the current input value (each time you type in it)
reproForm.oninput = function() {
    reproSlider.value = this.value;
    if (this.value != 0)
    diffFunc(this.value);
}

// Remembers last reproction value using cookie
reproCookie = localStorage.getItem("reproValue");
reproForm.value = reproCookie;
reproSlider.value = reproCookie;
console.log("Reproduction value = " + reproCookie);

// Update the current slider value (each time you drag the slider handle)
reproSlider.oninput = function() {
    reproForm.value = this.value;

    diffFunc(this.value);
    localStorage.setItem("reproValue", this.value);
}

// Population
popForm.oninput = function() {
    popSlider.value = this.value;
}
popSlider.oninput = function() {
    popForm.value = this.value;
}

let a1 = 2;
let b1 = 0;
let y1 = [];
// Transmission
tranForm.oninput = function() {
    tranSlider.value = this.value;
    a1 = this.value;
    linFunc();
}
tranSlider.oninput = function() {
    tranForm.value = this.value;
    a1 = this.value;
    linFunc();
}

// Recovery time
recForm.oninput = function() {
    recSlider.value = this.value;
    b1 = this.value;
    linFunc();
}
recSlider.oninput = function() {
    recForm.value = this.value;
    b1 = this.value;
    linFunc();
}

function linFunc() {
    y1.length = 0;
    a1 = Number(a1);          // JavaScript skal lige fatte det er et tal
    b1 = Number(b1);          // JavaScript skal lige fatte det er et tal
    
    for (let i = 0; i < xArr.length; i++) {
        parseInt(y1[i]);     // JavaScript skal lige fatte det er et tal
        y1[i] = a1 * xArr[i] + b1;
    }
    updateGraph();
}

let alpha = 0.000006, beta = 0.02;

/************************************************************************************************/
function diffFunc(something) { 
    console.log("Kører diffFunc");
    function rk4(y, x, dx, f) {
        var k1 = dx * f(x, y),
            k2 = dx * f(x + dx / 2.0,   +y + k1 / 2.0),
            k3 = dx * f(x + dx / 2.0,   +y + k2 / 2.0),
            k4 = dx * f(x + dx,         +y + k3);
    
        // T4
        console.log("This is the dx : "+dx);
        return y + (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0;
    }
    
    function f(x, y) {
        return -alpha * (10000*x) * (5*x);

        //return Math.sin(x)*something+Math.cos(y);
        
        //return Math.sin(x)*something;
    }
    /*
    function actual(x) {
        return Math.pow(x,2)
        //return (1/16) * (x*x+4)*(x*x+4);
    }
    */
    
    var 
        // y0 and x0
        y = 1.0,
        x = 0.0,
        // h = step
        h = 0.1,
        steps = 0,
        maxSteps = 101,
        sampleEveryN = 1;
    
    let chartS = [];
        
    for(let i = 0; i < maxSteps; i++){
        if (steps%sampleEveryN === 0) {
            console.log("y(" + x + ") = " + y);
            chartS.push(y);
        }
        y = rk4(y, x, h, f);
        
        // using integer math for the step addition
        // to prevent floating point errors as 0.2 + 0.1 != 0.3
        x = ((x * 10) + (h * 10)) / 10;
        steps += 1;
    }

    myChart.data.datasets[2].data = chartS;
    myChart.update();
}
/************************************************************************************************/



// Initialiserer graf
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xArr,
        datasets: [
        {
            label: "Susceptible individuals",
            data: chartS,
            borderWidth: 1,
            borderColor: "red",
            lineTension: 0.3
        },
        {
            label: "Infectious individuals",
            data: chartI,
            borderWidth: 1,
            borderColor: "blue",
            lineTension: 0.3
        },
        {
            label: "Removed or deceased individuals",
            data: chartR,
            borderWidth: 1,
            borderColor: "green",
            lineTension: 0.3
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
        /*
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: "xy",
                    rangeMin: {
                        // Format of min pan range depends on scale type
                        x: null,
                        y: null
                    },
                    rangeMax: {
                        // Format of max pan range depends on scale type
                        x: null,
                        y: null
                    },
                    speed: 1,

                    threshold: 10,
                    onPan: function({chart}) { console.log(`I'm panning!!!`); },
                    onPanComplete: function({chart}) { console.log(`I was panned!!!`); },
                    
                },
                // Container for zoom options
                
                zoom: {
                    // Boolean to enable zooming
                    enabled: true,
        
                    // Enable drag-to-zoom behavior
                    drag: true,
        
                    // Drag-to-zoom effect can be customized
                    // drag: {
                    // 	 borderColor: 'rgba(225,225,225,0.3)'
                    // 	 borderWidth: 5,
                    // 	 backgroundColor: 'rgb(225,225,225)',
                    // 	 animationDuration: 0
                    // },
        
                    // Zooming directions. Remove the appropriate direction to disable
                    // Eg. 'y' would only allow zooming in the y direction
                    // A function that is called as the user is zooming and returns the
                    // available directions can also be used:
                    //   mode: function({ chart }) {
                    //     return 'xy';
                    //   },
                    mode: 'xy',
        
                    rangeMin: {
                        // Format of min zoom range depends on scale type
                        x: null,
                        y: null
                    },
                    rangeMax: {
                        // Format of max zoom range depends on scale type
                        x: null,
                        y: null
                    },
        
                    // Speed of zoom via mouse wheel
                    // (percentage of zoom on a wheel event)
                    speed: 10,
        
                    // Minimal zoom distance required before actually applying zoom
                    threshold: 2,
        
                    // On category scale, minimal zoom level before actually applying zoom
                    sensitivity: 3,
        
                    // Function called while the user is zooming
                    onZoom: function({chart}) { console.log(`I'm zooming!!!`); },
                    // Function called once zooming is completed
                    onZoomComplete: function({chart}) { console.log(`I was zoomed!!!`); }
                }
            }
        }*/
    },
    
});

function updateGraph() {
    console.log("Updating chart.")
    
    // Changes labels to xArr dynamically
    // myChart.data.datasets[0].data = xArr;
    myChart.data.datasets[1].data = y1;
    myChart.update();
}
