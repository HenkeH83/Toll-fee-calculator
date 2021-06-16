/**
 * Hanterar uträkning av den totala avgiften.
 * @param {Array} occations - Lista med tider som skall debiteras ett fordon.
 * @returns {Number} Avgift att debitera.
 */
export default function getTotalFee(occations) {
    let fee = 0;
    occations.forEach(occation => {
        fee += getPrice(occation)
    })
    return fee
}

function getPrice(time) {
    if ((time.hour === 6 && time.minutes < 30)
        || (time.hour === 8 && time.minutes >= 30)
        || (time.hour >= 9) && (time.hour <= 14 && time.minutes <= 59)
        || (time.hour === 18 && time.minutes < 30)) {
        return 9
    }
    if ((time.hour === 6 && (time.minutes >= 30 && time.minutes <= 59))
        || (time.hour === 8 && time.minutes < 30)
        || (time.hour === 15 && time.minutes < 30)
        || (time.hour === 17 && time.minutes < 30)) {
        return 16
    }
    if ((time.hour === 7 && time.minutes <= 59)
        || (time.hour >= 15 && time.minutes >= 30) && (time.hour <= 16 && time.minutes <= 59)) {
        return 22
    }
}