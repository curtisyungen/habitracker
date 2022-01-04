import moment from "moment";

import { HABIT } from "../res/main";
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

export default class HabitHelper {
    static filterHabits(habits, filter, date) {
        if (!habits) return [];

        switch (filter) {
            case FILTER.DUE:
                return habits.filter(
                    (h) =>
                        this.checkIfHabitDueToday(h, date) &&
                        h.status === HABIT.STATUS.ACTIVE
                );
            case FILTER.INCOMPLETE:
                return habits.filter(
                    (h) =>
                        this.checkIfHabitDueToday(h, date) &&
                        !this.checkIfDateInTimeline(h, date) &&
                        h.status === HABIT.STATUS.ACTIVE
                );
            case FILTER.COMPLETE:
                return habits.filter(
                    (h) =>
                        this.checkIfHabitDueToday(h, date) &&
                        this.checkIfDateInTimeline(h, date) &&
                        h.status === HABIT.STATUS.ACTIVE
                );
            case FILTER.INACTIVE:
                return habits.filter((h) => h.status === HABIT.STATUS.INACTIVE);
            case FILTER.ACTIVE:
                return habits.filter((h) => h.status === HABIT.STATUS.ACTIVE);
            case FILTER.ALL:
            default:
                return habits;
        }
    }

    static sortHabits(habits, sort) {
        function sortBy(a, b) {
            if (a[sort] === b[sort]) return 0;
            return a[sort] > b[sort] ? 1 : -1;
        }

        return habits.sort(sortBy);
    }

    static momentizeDate(date) {
        return {
            year: moment(date).format("YYYY"),
            month: moment(date).format("M"),
            day: moment(date).format("D"),
            yyyymmdd: moment(date).format("YYYY-MM-DD"),
            isoWeekday: moment(date).isoWeekday(),
            thisMonday:
                moment(date).day("monday") > moment(date)
                    ? moment(date).subtract(1, "week").day("monday")
                    : moment(date).day("monday"),
        };
    }

    static formatDate(year, month, day) {
        return moment()
            .year(year)
            .month(month - 1)
            .date(day)
            .format("YYYY-MM-DD");
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

        const habitType = habit.habit_type;

        if (habitType === HABIT.TYPE.CHECK_OFF) {
            if (day in timeline[year][month]) {
                delete timeline[year][month][day];

                if (Object.keys(timeline[year][month]).length === 0) {
                    delete timeline[year][month];

                    if (Object.keys(timeline[year]).length === 0) {
                        delete timeline[year];
                    }
                }
            } else {
                timeline[year][month][day] = value || "";
            }
        } else {
            if (value && value !== "") {
                timeline[year][month][day] = value;
            } else {
                delete timeline[year][month][day];

                if (Object.keys(timeline[year][month]).length === 0) {
                    delete timeline[year][month];

                    if (Object.keys(timeline[year]).length === 0) {
                        delete timeline[year];
                    }
                }
            }
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
        };
    }

    static unpackHabitData(data) {
        return {
            ...data,
            frequency: JSON.parse(data.frequency),
            timeline: JSON.parse(data.timeline),
        };
    }

    static getHabitMetrics(habit) {
        const timeline = habit.timeline;

        // CREATE DATE
        const createDate = this.momentizeDate(habit.createdAt).yyyymmdd;

        if (Object.keys(timeline).length === 0) {
            return {
                "Create date": createDate,
                "First completion": "N/A",
                "Last completion": "N/A",
                "Total completions": 0,
                "Current streak": 0,
                "Longest streak": 0,
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

        const firstCompletion =
            maxDay > -1 ? this.formatDate(minYear, minMonth, minDay) : null;
        const lastCompletion =
            maxDay > -1 ? this.formatDate(maxYear, maxMonth, maxDay) : null;
        const diff =
            firstCompletion && lastCompletion
                ? moment(lastCompletion).diff(firstCompletion, "days")
                : 0;

        // TOTAL COMPLETIONS
        // CURRENT & LONGEST STREAK
        let totalCompletions = 0;
        let longestStreak = 0;
        let currentStreak = 0;

        for (var i = 0; i <= diff; i++) {
            if (
                this.checkIfDateInTimeline(
                    habit,
                    moment(firstCompletion).add(i, "days")
                )
            ) {
                currentStreak += 1;
                longestStreak = Math.max(longestStreak, currentStreak);
                totalCompletions += 1;
            } else {
                longestStreak = Math.max(longestStreak, currentStreak);
                currentStreak = 0;
            }
        }

        return {
            Created: createDate,
            "First completion": firstCompletion || "N/A",
            "Last completion": lastCompletion || "N/A",
            "Total completions": totalCompletions,
            "Current streak": currentStreak,
            "Longest streak": longestStreak,
        };
    }

    static checkIfHabitDueToday(habit, date) {
        return (
            StringHelper.parseJSON(habit.frequency).indexOf(
                this.momentizeDate(date).isoWeekday
            ) > -1
        );
    }

    static checkIfDateInTimeline(habit, date) {
        const timeline = StringHelper.parseJSON(habit.timeline);
        const { year, month, day } = this.momentizeDate(date);
        return (
            timeline[year] &&
            timeline[year][month] &&
            day in timeline[year][month]
        );
    }

    static getValueForDate(habit, date) {
        const timeline = StringHelper.parseJSON(habit.timeline);
        const { year, month, day } = this.momentizeDate(date);
        if (timeline[year] && timeline[year][month]) {
            return timeline[year][month][day];
        }
    }

    static getCheckValueOrTarget(habit, date) {
        if (habit.habit_type === HABIT.TYPE.CHECK_OFF) {
            return IconHelper.getIcon(ICON.CHECK);
        }

        const timeline = StringHelper.parseJSON(habit.timeline);
        const { year, month, day } = this.momentizeDate(date);
        return this.checkIfDateInTimeline(habit, date)
            ? timeline[year][month][day]
            : habit.target;
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
