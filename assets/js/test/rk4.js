const h = 0.01, totalSteps = 10;

let dataTest = [1];

function rk4() {
    // Test function
    function fTest(t) { return t; }
    
    for (i = 1; i <= totalSteps; i++){
    // RK4 on test function
    let Testk1 = fTest(dataTest[i-1]),
        Testk2 = fTest(dataTest[i-1] + h/2*Testk1),
        Testk3 = fTest(dataTest[i-1] + h/2*Testk2),
        Testk4 = fTest(dataTest[i-1] + h*Testk3);

    dataTest.push(dataTest[i-1] + (Testk1 + 2*(Testk2 + Testk3) + Testk4)*h/6);
    }
    
    return dataTest;
}

module.exports = rk4;