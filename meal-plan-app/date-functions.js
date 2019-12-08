// Set date to 12am
Date.prototype.timeStartOfDay = function() {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
}

// Set date to 11:59:59pm
Date.prototype.timeEndOfDay = function(){
    this.setHours(23);
    this.setMinutes(59);
    this.setSeconds(59);
    this.setMilliseconds(999);
}

// Get first day of week
function getFirstDayOfWeek(date){
    return firstDayOfWeek = new Date(date.getTime() - (date.getDay() * 86400000));
}

// Get last day of week
function getLastDayOfWeek(date){
    return lastDayOfWeek = new Date(date.getTime() + (6 * 86400000));
}

// Get Array of Current Week
function getCurrentWeek(date){
    const weekArray = []
    for (var i = 0; i < 7; i++) {
        const weekDay = changeDate(date, i);
        weekArray.push(weekDay);
    }

    return weekArray;
}
// Get date 'X' number of days from passed date
function changeDate(date, days){
    return dateTo = new Date(date.getTime() + (days * 86400000));
}
// Check Daylight savings
function checkDaylightSavings(date){
    if (date.getHours() == 23) {
        date.setTime(date.getTime() + 3600000);
    } else if (date.getHours() == 1) {
        date.setTime(date.getTime() - 3600000);
    }
}

// Get Date Text (short - YYYY/MM/DD or MM/DD/YYYY)
function getDateText(date, type = 'int'){
    if(type == 'int'){
        return dateText = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate() < 10 ? 0 : ''}${date.getDate()}`;
    }else if(type == 'us'){
        return dateText = `${date.getMonth()+1}/${date.getDate() < 10 ? 0 : ''}${date.getDate()}/${date.getFullYear()}`;
    }
}