const YEAR = 31557600;
const MONTH = 2628288;
const DAY = 86400;
const HOUR = 3600;
const MINUTE = 60;

function dateToInt(inputArr) {
    let floatArr = [];
    
    for (i = 1; i < inputArr.length; i++) {
        floatArr[i] = parseInt(inputArr[i].slice(6,10))*YEAR + 
                      parseInt(inputArr[i].slice(3,5))*MONTH + 
                      parseInt(inputArr[i].slice(0,2))*DAY + 
                      parseInt(inputArr[i].slice(11,13))*HOUR + 
                      parseInt(inputArr[i].slice(14,16))*MINUTE + 
                      parseInt(inputArr[i].slice(17,19));
    }
    return floatArr;
}
module.exports = dateToInt;