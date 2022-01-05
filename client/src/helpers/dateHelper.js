import moment from "moment";

const FIRST_DAY_OF_WEEK = "Sunday";

export default class DateHelper {
    static getCurrWeekStart() {
        return moment().day(FIRST_DAY_OF_WEEK).format("YYYY-MM-DD");
    }

    static getNextWeekStart(date = moment()) {
        return moment(date)
            .day(FIRST_DAY_OF_WEEK)
            .add(7, "days")
            .format("YYYY-MM-DD");
    }

    static getPrevWeekStart(date = moment()) {
        return moment(date)
            .day(FIRST_DAY_OF_WEEK)
            .subtract(7, "days")
            .format("YYYY-MM-DD");
    }

    static getYearMonthDay(date = moment()) {
        return {
            year: moment(date).format("YYYY"),
            month: moment(date).format("M"),
            day: moment(date).format("D"),
        };
    }
}
