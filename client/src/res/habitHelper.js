const requiredFields = ["title", "habit_type", "start_date", "category", "frequency", "frequency_data", "timeline", "status"];

export function validateHabitData(data) {
    for (var i = 0; i < requiredFields.length; i++) {
        if (!data[requiredFields[i]]) {
            alert(`Missing ${requiredFields[i]}.`);
            return false;
        }

        return true;
    }
}

export function prepHabitDataForSubmit(data) {
    return {
        ...data,
        frequency_data: JSON.stringify(data.frequency_data),
        timeline: JSON.stringify({}),
    }
}