// Reproduction Rate
let infRateSlider = document.getElementById("myRange1");
let infRateOutput = document.getElementById("myRange1Value");
let infRateName = document.getElementById("myRange1Name");
infRateOutput.innerHTML = infRateSlider.value; 
infRateName.innerHTML = "Reproduction Number";
let infInputBar = document.getElementById("myRange1bar");

// Population
let plpSlider = document.getElementById("myRange2");
let plpOutput = document.getElementById("myRange2Value");
let plpName = document.getElementById("myRange2Name");
plpOutput.innerHTML =  plpSlider.value;
plpName.innerHTML = "Population";

// Initialize the graph
chartShow(2);

// Udate the current input value (each time you type in it)
infInputBar.oninput = function() {
    infRateSlider.value = this.value;
    infRateOutput.innerHTML = this.value;

    chart.data.labels[1] = this.value;
    chart.update();
    //chartShow(this.value);
}

// Update the current slider value (each time you drag the slider handle)
infRateSlider.oninput = function() {
    infInputBar.value = this.value;
    infRateOutput.innerHTML = this.value;    
    
    chartShow(this.value);    
}

plpSlider.oninput = function() {
    plpOutput.innerHTML = this.value;
}

function changeText() {
    document.getElementById("change").innerHTML = "Hejsa";
}

function chartShow(infTal){
    var ctx = document.getElementById("myChart");
    var data = {
        labels: [1, infTal],
        datasets: [{
            label: "f(x) = x",
            function: function(x) { return x },
            borderColor: "blue",
            data: [],
            fill: false
        },
        {
            label: "f(x) = x²",
            function: function(x) { return x*x },
            borderColor: "red",
            data: [],
            fill: false
        },
        {
            label: "f(x) = x * log(x)",
            function: function(x) { return x*Math.log(x) },
            borderColor: "black",
            data: [],
            fill: false
        }]
    };

    Chart.pluginService.register({
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                    var fct = data.datasets[i].function,
                        x = data.labels[j],
                        y = fct(x);
                    data.datasets[i].data.push(y);
                }
            }
        }
    });

    var chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            maintainAspectRatio: false,
            animation: {
                duration: 0
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}


//UDATING CHART
// Reproduction Rate
let infRateSlider = document.getElementById("myRange1");
let infRateName = document.getElementById("myRange1Name");
infRateName.innerHTML = "Reproduction Number";
let infInputBar = document.getElementById("myRange1bar");
infInputBar.value = infRateSlider.value;

// Population
let plpSlider = document.getElementById("myRange2");
let plpName = document.getElementById("myRange2Name");
plpName.innerHTML = "Population";
let plpInputBar = document.getElementById("myRange2bar");


// Initialize the graph
//chartShow(5);

// Udate the current input value (each time you type in it)
infInputBar.oninput = function() {
    infRateSlider.value = this.value;

    updateChart(this.value);

    //if (this.value > 0)
       // chartShow(this.value);
}

// Update the current slider value (each time you drag the slider handle)
infRateSlider.oninput = function() {
    infInputBar.value = this.value;
    
    updateChart(this.value);
   // chartShow(this.value);    
}

plpSlider.oninput = function() {
    plpInputBar.value = this.value;
    plpOutput.innerHTML = this.value;
}

function updateChart(infTal) {
    console.log("Updating chart");
    console.log("Before " + chart.data.labels[1]);
    chart.data.labels[1] = infTal;
    console.log("After " + chart.data.labels[1]);
    chartCal();
    chart.update();
}
/*
function chartShow(infTal){
    var ctx = document.getElementById("myChart");
    var data = {
        labels: [1, infTal],
        datasets: [{
            label: "f(x) = x",
            function: function(x) { return x },
            borderColor: "blue",
            data: [],
            fill: false
        },
        {
            label: "f(x) = x²",
            function: function(x) { return x*x },
            borderColor: "red",
            data: [],
            fill: false
        },
        {
            label: "f(x) = x * log(x)",
            function: function(x) { return x*Math.log(x) },
            borderColor: "black",
            data: [],
            fill: false
        }]
    };

    Chart.pluginService.register({
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                    var fct = data.datasets[i].function,
                        x = data.labels[j],
                        y = fct(x);
                    data.datasets[i].data.push(y);
                }
            }
        }
    });

    var chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            maintainAspectRatio: false,
            animation: {
                duration: 0
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}
*/

// Initialize the graph
let infTal = 2;

var ctx = document.getElementById("myChart");
var data = {
    labels: [1, infTal],
    datasets: [{
    label: "f(x) = x",
    function: function(x) { return x },
        borderColor: "blue",
        data: [],
        fill: false
    },
    {
        label: "f(x) = x²",
        function: function(x) { return x*x },
        borderColor: "red",
        data: [],
        fill: false
    },
    {
        label: "f(x) = x * log(x)",
        function: function(x) { return x*Math.log(x) },
        borderColor: "black",
        data: [],
        fill: false
    }]
};

function chartCal() {
    Chart.pluginService.register({
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                    var fct = data.datasets[i].function,
                        x = data.labels[j],
                        y = fct(x);
                    data.datasets[i].data.push(y);
                }
            }
        }
    });
}
    
chartCal();

var chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        maintainAspectRatio: false,
        animation: {
            duration: 0
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});


// X værdi med for loop
// Reproduction Rate
let infRateSlider = document.getElementById("myRange1");
let infRateName = document.getElementById("myRange1Name");
infRateName.innerHTML = "Reproduction Number";
let infInputBar = document.getElementById("myRange1bar");
infInputBar.value = infRateSlider.value;

// Population
let plpSlider = document.getElementById("myRange2");
let plpName = document.getElementById("myRange2Name");
plpName.innerHTML = "Population";
let plpInputBar = document.getElementById("myRange2bar");

// Udate the current input value (each time you type in it)
infInputBar.oninput = function() {
    infRateSlider.value = this.value;
    infTal = this.value;
    updateChart(this.value);
    //if (this.value > 0)
       // chartShow(this.value);
}

// Update the current slider value (each time you drag the slider handle)
infRateSlider.oninput = function() {
    infInputBar.value = this.value;
    infTal = this.value;
    updateChart(this.value);
   // chartShow(this.value);
}

function updateChart(infTal) {
    console.log("Updating chart");
    //console.log("Before " + chart.data.labels[1]);
    //chart.data.labels[5] = infTal;
    //console.log("After " + chart.data.labels[1]);
    chartCal();
    updateData(data);
    chart.update();
}

// Initialize the graph

var ctx = document.getElementById("myChart");
let infTal = 200;

function chartCal() {

    let xArr = [];
    for (let i = 0; i < infTal; i++) {
        xArr[i] = i;
    }
    console.log("Array length = " + xArr.length);

    data = {
        labels: xArr,
        datasets: [{
        label: "f(x) = x",
        function: function(x) { return Math.pow(x, 2) },
            borderColor: "blue",
            lineTension: 0, //Default: 0.4
            data: [],
            fill: false
        },
        {
            label: "f(x) = x²",
            function: function(x) { return 2*x },
            borderColor: "red",
            lineTension: 0,
            data: [],
            fill: false,
        },
        {
            label: "f(x) = x * log(x)",
            function: function(x) { return x },
            borderColor: "black",
            lineTension: 0,
            data: [],
            fill: false
        }]
    };
    
    Chart.pluginService.register({
        beforeInit: function(chart) {
            data = chart.config.data;
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                    var fct = data.datasets[i].function,
                        x = data.labels[j],
                        y = fct(x);
                    data.datasets[i].data.push(y);
                }
            }
        }
    });

}


chartCal();

var chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        maintainAspectRatio: false,
        animation: {
            duration: 0
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        title: {
            display: false,
            text: "Hej Marius"
        }
    }
});
