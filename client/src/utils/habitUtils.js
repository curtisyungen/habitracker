import { HABIT } from "../res/main";
import moment from "moment";

export const MODE = {
    ADD: 0,
    EDIT: 1,
    NONE: 2,
}

export const VIEW = {
    DAY: 0,
    WEEK: 1,
    MONTH: 2,
}

export const FILTER = {
    DUE: 0,
    INCOMPLETE: 1,
    COMPLETE: 2,
    ALL: 3,
}

export default class HabitUtils {

    static filterHabits(habits, filter, date) {
        if (!habits) return [];

        switch (filter) {
            case FILTER.DUE: return habits.filter(h => JSON.parse(h.frequency).indexOf(this.momentizeDate(date).isoWeekday) > -1);
            case FILTER.ALL:
            default:
                return habits;
        }
    }

    static momentizeDate(date) {
        return {
            year: moment(date).format("YYYY"),
            month: moment(date).format("M"),
            day: moment(date).format("D"),
            isoWeekday: moment(date).isoWeekday(),
        }
    }

    static updateHabitTimeline(habit, date) {
        const timeline = habit.timeline;
        const { year, month, day } = this.momentizeDate(date);

        if (!timeline[year]) {
            timeline[year] = {};
        }

        if (!timeline[year][month]) {
            timeline[year][month] = [];
        }

        timeline[year][month] = timeline[year][month].indexOf(day) > -1
            ? timeline[year][month].filter(f => f !== day)
            : [...timeline[year][month], day].sort(this.sortAscending);

        return timeline;
    }

    sortAscending(a, b) {
        if (a === b) return 0;
        return a > b ? 1 : -1;
    }

    static validateHabitData(data) {
        for (var key of Object.keys(HABIT.FIELDS)) {
            if (HABIT.FIELDS[key].required && !data[HABIT.FIELDS[key].name]) {
                alert(`Missing ${key}.`);
                return false;
            }

            return true;
        }
    }

    static packHabitData(data) {
        return {
            ...data,
            frequency: JSON.stringify(data.frequency),
            timeline: JSON.stringify(data.timeline),
        }
    }

    static unpackHabitData(data) {
        return {
            ...data,
            frequency: JSON.parse(data.frequency),
            timeline: JSON.parse(data.timeline),
        }
    }
}