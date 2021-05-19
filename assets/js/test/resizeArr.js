function resizeArr(array) {
    let newdata = [],
        stepsToSkip;
    
    /* Always 100 points from the data array is added to the new array */
    if (array.length > 100) 
        stepsToSkip = (array.length/100);
    else
        return array;

    for(i = 0; i < 100; i++) {
        newdata.push(array[(i*stepsToSkip).toFixed(0)]);
    }
    return newdata;
}

module.exports = resizeArr;