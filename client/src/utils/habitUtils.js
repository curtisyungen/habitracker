import { HABIT } from "../res/main";
import moment from "moment";

export function validateHabitData(data) {
    for (var key of Object.keys(HABIT.FIELDS)) {
        if (HABIT.FIELDS[key].required && !data[HABIT.FIELDS[key].name]) {
            alert(`Missing ${key}.`);
            return false;
        }

        return true;
    }
}

export function packHabitData(data) {
    return {
        ...data,
        frequency: JSON.stringify(data.frequency),
        timeline: JSON.stringify(data.timeline),
    }
}

export function unpackHabitData(data) {
    return {
        ...data,
        frequency: JSON.parse(data.frequency),
        timeline: JSON.parse(data.timeline),
    }
}

export function updateHabitTimeline(habit, date) {
    const timeline = habit.timeline;

    const year = moment(date).format("YYYY");
    const month = moment(date).format("M");
    const day = moment(date).format("D");

    if (!timeline[year]) {
        timeline[year] = {};
    }

    if (!timeline[year][month]) {
        timeline[year][month] = [];
    }

    timeline[year][month] = timeline[year][month].indexOf(day) > -1
        ? timeline[year][month].filter(f => f !== day)
        : [...timeline[year][month], day].sort(sortAscending);

    return timeline;
}

function sortAscending(a, b) {
    if (a === b) return 0;
    return a > b ? 1 : -1;
}