const N = 2;

function errorCheck(value) {
    let errMess;

    /* If the form input is empty */
    if (value == "") { errMess = "Your initial value must be atleast 0."; }
    /* If the sum of EIR is greater than the population */
    else if (value > N) { errMess = `Error. The sum of E<span class="sub">0</span>, I<span class="sub">0</span> and R<span class="sub">0</span> can not be more than the total population (N).`; }
    else if (value < 0) { errMess = `Value can not be less than zero`; }
    /* Removes the text if none of the above statements hold */
    else { errMess = ""; }

    return errMess;
}

module.exports = errorCheck;