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
            yyyymmdd: moment(date).format("YYYY-MM-DD"),
            isoWeekday: moment(date).isoWeekday(),
        }
    }

    static formatDate(year, month, day) {
        return moment().year(year).month(month - 1).date(day).format("YYYY-MM-DD");
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

    static getHabitMetrics(habit) {
        const timeline = habit.timeline;

        if (Object.keys(timeline).length === 0) {
            return {};
        }

        // CREATE DATE
        const createDate = this.momentizeDate(habit.createdAt).yyyymmdd;

        // FIRST & LAST COMPLETION
        let minYear = 9999;
        let minMonth = 13;
        let maxYear = 0;
        let maxMonth = -1;

        for (var yr of Object.keys(timeline)) {
            minYear = Math.min(minYear, parseInt(yr));
            maxYear = Math.max(maxYear, parseInt(yr));
        }

        for (var mo of Object.keys(timeline[minYear])) {
            minMonth = Math.min(minMonth, parseInt(mo));
        }

        for (mo of Object.keys(timeline[maxYear])) {
            maxMonth = Math.max(maxMonth, parseInt(mo));
        }

        const minDay = parseInt(timeline[minYear][minMonth][0]);
        const maxDay = parseInt(timeline[maxYear][maxMonth][timeline[maxYear][maxMonth].length - 1]);

        const firstCompletion = minDay ? this.formatDate(minYear, minMonth, minDay) : null;
        const lastCompletion = maxDay ? this.formatDate(maxYear, maxMonth, maxDay) : null;

        // TOTAL COMPLETIONS
        let totalCompletions = 0;
        for (yr of Object.keys(timeline)) {
            for (mo of Object.keys(timeline[yr])) {
                totalCompletions += timeline[yr][mo].length;
            }
        }

        // CURRENT & LONGEST STREAK
        let entries = [];
        for (var i of Object.keys(timeline)) {
            for (var j of Object.keys(timeline[i])) {
                for (var k = 0; k < timeline[i][j].length; k++) {
                    entries.push(this.formatDate(i, j, timeline[i][j][k]));
                }
            }
        }

        let longestStreak = entries.length > 0 ? 1 : 0;
        let currentStreak = entries.length > 0 ? 1 : 0;
        let prevEntry = entries[0];

        for (var m = 1; m < entries.length; m++) {
            if (moment(prevEntry).add(1, "day").format("YYYY-MM-DD") === entries[m]) {
                currentStreak += 1;
                longestStreak = Math.max(longestStreak, currentStreak);
            } else {
                longestStreak = Math.max(longestStreak, currentStreak);
                currentStreak = 1;
            }

            prevEntry = entries[m];
        }

        return {
            createDate,
            firstCompletion,
            lastCompletion,
            totalCompletions,
            longestStreak,
            currentStreak,
        };
    }
}