const requiredFields = ["title", "habit_type", "start_date", "category", "frequency", "timeline", "status"];

export function validateHabitData(data) {
    for (var i = 0; i < requiredFields.length; i++) {
        if (!data[requiredFields[i]]) {
            alert(`Missing ${requiredFields[i]}.`);
            return false;
        }

        return true;
    }
}

export function packHabitData(data) {
    return {
        ...data,
        frequency: JSON.stringify(data.frequency),
        timeline: JSON.stringify({}),
    }
}

export function unpackHabitData(data) {
    return {
        ...data,
        frequency: JSON.parse(data.frequency),
        timeline: JSON.parse(data.timeline),
    }
}