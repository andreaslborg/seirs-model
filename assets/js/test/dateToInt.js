const   YEAR = 31557600,
        MONTH = 2628288,
        DAY = 86400,
        HOUR = 3600,
        MINUTE = 60;

function dateToInt(inputArr) {
    let intArr = [];
    
    for (i = 1; i < inputArr.length; i++) {
        intArr[i] = parseInt(inputArr[i].slice(6,10))*YEAR + 
                      parseInt(inputArr[i].slice(3,5))*MONTH + 
                      parseInt(inputArr[i].slice(0,2))*DAY + 
                      parseInt(inputArr[i].slice(11,13))*HOUR + 
                      parseInt(inputArr[i].slice(14,16))*MINUTE + 
                      parseInt(inputArr[i].slice(17,19));
    }
    return intArr;
}
module.exports = dateToInt;