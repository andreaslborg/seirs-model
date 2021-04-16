
let beta = 0.025,
    gamma = 0.0006,
    S0 = 99000,
    I0 = 1000,
    R0 = 0,
    h = 0.1,
    steps = 1000;

function rk4sir(){
    function fS(S, I){
        return -(beta*I*S)/N;
    }
    
    function fI(S, I){
        return beta*I*S/N - gamma*I;
    }
    
    function fR(I){
        return gamma*I;
    }

    let N = S0 + I0 + R0,
        S = [S0],
        I = [I0],
        R = [R0];

    for (i = 1; i <= steps; i++){
        let Sk1 = fS(S[i-1], I[i-1]),
            Sk2 = fS(S[i-1] + h/2*Sk1, I[i-1] + h/2*Sk1),
            Sk3 = fS(S[i-1] + h/2*Sk2, I[i-1] + h/2*Sk2),
            Sk4 = fS(S[i-1] + h*Sk3, I[i-1] + h*Sk3),
            Ik1 = fI(S[i-1], I[i-1]),
            Ik2 = fI(S[i-1] + h/2*Ik1, I[i-1] + h/2*Ik1),
            Ik3 = fI(S[i-1] + h/2*Ik2, I[i-1] + h/2*Ik2),
            Ik4 = fI(S[i-1] + h*Ik3, I[i-1] + h*Ik3),
            Rk1 = fR(I[i-1]),
            Rk2 = fR(I[i-1] + h/2*Rk1),
            Rk3 = fR(I[i-1] + h/2*Rk2),
            Rk4 = fR(I[i-1] + h*Rk3),
            t = i*h;

        S.push(S[i-1] + (Sk1 + 2*(Sk2 + Sk3) + Sk4)/6);
        I.push(I[i-1] + (Ik1 + 2*(Ik2 + Ik3) + Ik4)/6);
        R.push(R[i-1] + (Rk1 + 2*(Rk2 + Rk3) + Rk4)/6);

        if (i % 100 === 0)
            console.log("S(" + t.toFixed(0) + ") = " + S[i].toFixed(3) + ", \t I(" + t.toFixed(1) + ") = " + I[i].toFixed(3) + ", \t R(" + t.toFixed(1) + ") = " + R[i].toFixed(3));
    }
}
