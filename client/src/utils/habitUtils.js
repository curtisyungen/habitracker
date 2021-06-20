import { HABIT } from "../res/main";
import moment from "moment";

export const MODE = {
    ADD: "Add",
    EDIT: "Edit",
    NONE: "None",
}

export const VIEW = {
    DAY: "Day",
    WEEK: "Week",
    MONTH: "Month",
}

export const FILTER = {
    DUE: "Due",
    INCOMPLETE: "Incomplete",
    COMPLETE: "Complete",
    ALL: "All",
}

export default class HabitUtils {

    static filterHabits(habits, filter, date) {
        if (!habits) return [];

        switch (filter) {
            case FILTER.DUE:
                return habits.filter(h => this.checkIfHabitDueToday(h, date));
            case FILTER.INCOMPLETE:
                return habits.filter(h => this.checkIfHabitDueToday(h, date) && !this.checkIfDateInTimeline(h, date))
            case FILTER.COMPLETE:
                return habits.filter(h => this.checkIfHabitDueToday(h, date) && this.checkIfDateInTimeline(h, date))
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

    static updateHabitTimeline(habit, date, value) {
        const timeline = habit.timeline;
        const { year, month, day } = this.momentizeDate(date);

        if (!timeline[year]) {
            timeline[year] = {};
        }

        if (!timeline[year][month]) {
            timeline[year][month] = {};
        }

        if (day in timeline[year][month]) {
            delete timeline[year][month][day];
        } else {
            timeline[year][month][day] = value || "";
        }

        return timeline;
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

        // CREATE DATE
        const createDate = this.momentizeDate(habit.createdAt).yyyymmdd;

        if (Object.keys(timeline).length === 0) {
            return {
                createDate,
                firstCompletion: "N/A",
                lastCompletion: "N/A",
                totalCompletions: 0,
                longestStreak: 0,
                currentStreak: 0,
            };
        }

        // FIRST & LAST COMPLETION
        let minYear = 9999;
        let maxYear = 0;

        for (var yr of Object.keys(timeline)) {
            minYear = Math.min(minYear, parseInt(yr));
            maxYear = Math.max(maxYear, parseInt(yr));
        }

        let minMonth = 13;
        let maxMonth = -1;

        for (var mo of Object.keys(timeline[minYear])) {
            minMonth = Math.min(minMonth, parseInt(mo));
        }

        for (mo of Object.keys(timeline[maxYear])) {
            maxMonth = Math.max(maxMonth, parseInt(mo));
        }

        let minDay = 32;
        let maxDay = -1;

        for (var dy of Object.keys(timeline[minYear][minMonth])) {
            minDay = Math.min(minDay, parseInt(dy));
        }

        for (dy of Object.keys(timeline[maxYear][maxMonth])) {
            maxDay = Math.max(maxDay, parseInt(dy));
        }

        const firstCompletion = maxDay > -1 ? this.formatDate(minYear, minMonth, minDay) : null;
        const lastCompletion = maxDay > -1 ? this.formatDate(maxYear, maxMonth, maxDay) : null;
        const diff = firstCompletion && lastCompletion ? moment(lastCompletion).diff(firstCompletion, "days") : 0;

        // TOTAL COMPLETIONS
        // CURRENT & LONGEST STREAK
        let totalCompletions = firstCompletion ? 1 : 0;
        let longestStreak = firstCompletion ? 1 : 0;
        let currentStreak = firstCompletion ? 1 : 0;

        if (diff > 0) {
            let currDate = firstCompletion;

            for (var i = 0; i < diff; i++) {
                if (this.checkIfDateInTimeline(habit, currDate)) {
                    currentStreak += 1;
                    longestStreak = Math.max(longestStreak, currentStreak);
                    totalCompletions += 1;
                } else {
                    longestStreak = Math.max(longestStreak, currentStreak);
                    currentStreak = 1;
                }
                currDate = moment(currDate).add(1, "days");
            }
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

    static checkIfHabitDueToday(habit, date) {
        return this.parseJSONIfNeeded(habit.frequency).indexOf(this.momentizeDate(date).isoWeekday) > -1;
    }

    static checkIfDateInTimeline(habit, date) {
        const timeline = this.parseJSONIfNeeded(habit.timeline);
        const { year, month, day } = this.momentizeDate(date);

        if (timeline[year] && timeline[year][month]) {
            return day in timeline[year][month];
        }

        return false;
    }

    static parseJSONIfNeeded(string) {
        try {
            JSON.parse(string);
        } catch (e) {
            return string;
        }
        return JSON.parse(string);
    }
}