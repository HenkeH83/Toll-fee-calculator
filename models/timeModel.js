export default class TimeModel {
    constructor(dateObject) {
        this.hour = dateObject.getHours()
        this.minutes = dateObject.getMinutes()
    }
}