import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import { ICON, IconHelper, StringHelper } from ".";

export const FILTER = {
    ACTIVE: "Active",
    ALL: "All",
    COMPLETE: "Complete",
    DUE: "Due",
    INACTIVE: "Inactive",
    INCOMPLETE: "Incomplete",
};

export const MODE = {
    ADD: "Add",
    EDIT: "Edit",
    ENTER_VALUE: "Enter value",
    NONE: "None",
};

export const SORT = {
    CATEGORY: "Category",
    CURR_STREAK: "Current streak",
    TITLE: "Title",
    TOTAL_COMPLETIONS: "Total completions",
    TOTAL_STREAK: "Total streak",
};

export const VIEW = {
    DAY: "Day",
    MONTH: "Month",
    WEEK: "Week",
};

const FIRST_DAY_OF_WEEK = "Sunday";

export default class HabitHelper {
    static getBundledHabitData(data) {
        return {
            title: data.title,
            description: data.description,
            type: data.type,
            category: data.category,
            target: data.target,
            targetType: data.targetType,
            timeline: StringHelper.stringifyJSON(data.timeline),
            status: data.status,
        };
    }

    static getUnbundledHabitData(data) {
        return {
            id: data.id,
            title: data.title,
            description: data.description,
            type: data.type,
            category: data.category,
            target: data.target,
            targetType: data.targetType,
            timeline: StringHelper.parseJSON(data.timeline, {}),
            status: data.status,
        };
    }

    static getDateInTimeline(habit, date) {
        const timeline = StringHelper.parseJSON(habit.timeline);
        const year = this.momentizeDate(date).year;
        const month = this.momentizeDate(date).month;
        const day = this.momentizeDate(date).date;
        if (
            timeline[year] &&
            timeline[year][month] &&
            timeline[year][month][day]
        ) {
            return timeline[year][month][day];
        }
        return false;
    }

    static momentizeDate(date = moment()) {
        return {
            currWeekStart: moment(date)
                .day(FIRST_DAY_OF_WEEK)
                .format("YYYY-MM-DD"),
            date: moment(date).format("D"),
            prevWeekStart: moment(date)
                .day(FIRST_DAY_OF_WEEK)
                .subtract(7, "days")
                .format("YYYY-MM-DD"),
            month: moment(date).format("M"),
            nextWeekStart: moment(date)
                .day(FIRST_DAY_OF_WEEK)
                .add(7, "days")
                .format("YYYY-MM-DD"),
            today: moment().format("YYYY-MM-DD"),
            year: moment(date).format("YYYY"),
        };
    }
}
