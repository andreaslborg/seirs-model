/* Finds the max value in an array */
function findMax(arr){
    let max = 0;

    for(i=0; i < arr.length; i++){
        if(arr[i] > max)
            max = arr[i];
    }
    return max;
}

module.exports = findMax;