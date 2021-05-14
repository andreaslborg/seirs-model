let beta = transCookie,
    gamma = remCookie,
    epsilon = 0.0001,
    sigma = 0.01,
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
    beta = 0.025;
    gamma = 0.0006;
    epsilon = 0.0001,
    sigma = 0.01,
    S0 = 99000;
    E0 = 0;
    I0 = 1000;
    R0 = 0;
    h = 0.1;
    steps = 10000;
    N = S0 + E0 + I0 + R0;
    dataS = [S0];
    dataE = [E0];
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
            Sk4 = fS(dataS[i-1] + h*Sk3, dataI[i-1] + h*Sk3, dataI[i-1] + h*Sk1),

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
            
        tArr[i] = (i*h).toFixed(1);
        
        dataS.push(dataS[i-1] + (Sk1 + 2*(Sk2 + Sk3) + Sk4)*h/6);
        dataE.push(dataE[i-1] + (Ek1 + 2*(Ek2 + Ek3) + Ek4)*h/6);
        dataI.push(dataI[i-1] + (Ik1 + 2*(Ik2 + Ik3) + Ik4)*h/6);
        dataR.push(dataR[i-1] + (Rk1 + 2*(Rk2 + Rk3) + Rk4)*h/6);
    }
}