'use strict';

function generateId() {
    return Math.floor(Math.random() * 100000);
}

function getCurrentDate() {
    let dateNow = new Date();
    let dd = dateNow.getDate();
    let monthSingleDigit = dateNow.getMonth() + 1,
        mm = monthSingleDigit < 10 ? '0' + monthSingleDigit : monthSingleDigit;
    let yy = dateNow.getFullYear().toString().substr(2);

    return mm + '/' + dd + '/' + yy;
}
