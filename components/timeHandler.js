import https from 'https';
import TimeModel from '../models/timeModel.js';
/**
 * Kontrollerar vilka tider som är innom tidsramen för att debiteras.
 * Javascript metoden getMonth() startar på '0' för att vara kompatibel med arrays, därav "+1" vid tillfällen för att kompensera.
 * @param {Array} occasions - Lista med tillfällen då ett fordon har passerat en vägtull.
 * @returns {Array} En lista med tider som är innom tidsramen för avgift.
 */
export default async function getTollableOccations(occasions) {
    let tollableOccasions = []
    if (occasions[0].getMonth() + 1 === 7) {
        return tollableOccasions
    }
    for (const [index, occasion] of occasions.entries()) {
        const isFreeTime = checkFreeTime(occasion)
        if (isFreeTime) {
            continue
        }
        const isFreeDay = await checkFeeFreeDay(occasion)
        if (!isFreeDay) {
            const isWithinOneHour = checkTimeSpan(occasion, occasions, index)
            if (!isWithinOneHour) {
                const timeObject = new TimeModel(occasion)
                tollableOccasions.push(timeObject)
            }
        }
    }
    return tollableOccasions
}

function checkFreeTime(dateObj) {
    if (dateObj.getHours() < 6
        || (dateObj.getHours() === 18 && dateObj.getMinutes() > 29)
        || dateObj.getHours() >= 19) {
        return true
    }
    return false;
}

function checkTimeSpan(currentObj, objList, index) {
    if (index === 0 || checkFreeTime(objList[index - 1])) {
        return false
    }
    let previousTime = objList[index - 1]
    previousTime.setHours(previousTime.getHours() + 1)
    if (currentObj < previousTime) {
        return true
    }
}

async function checkFeeFreeDay(dateObj) {
    const yearMonth = `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}`

    const dataForCurrentDay = await getDataFromApi(`${yearMonth}/${dateObj.getDate()}`)
    const currentDayIsRed = checkIsRedDay(dataForCurrentDay)
    const isWeekend = checkIsWeekend(dataForCurrentDay)
    if (currentDayIsRed || isWeekend) {
        return true
    }
    const dataForDayAfter = await getDataFromApi(`${yearMonth}/${dateObj.getDate() + 1}`)
    const dayAfterIsRedDay = checkIsRedDay(dataForDayAfter)
    if (dayAfterIsRedDay) {
        return true
    }
    return false
}

function getDataFromApi(day) {
    const basePath = 'https://sholiday.faboul.se/dagar/v2.1/'
    const query = basePath + day;

    return new Promise((resolve, reject) => {
        https.get(query, res => {
            let rawData = '';
            res.on('data', chunk => {
                rawData += chunk
            })

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (error) {
                    reject(error.message);
                }
            })
        }).on('error', error => {
            reject(error.message);
        })
    })
}

function checkIsRedDay(apiResponse) {
    return apiResponse.dagar[0]['röd dag'] === 'Ja' ? true : false;
}

function checkIsWeekend(apiResponse) {
    return (apiResponse.dagar[0].veckodag === 'Lördag' || apiResponse.dagar[0].veckodag === 'Söndag') ? true : false;
}