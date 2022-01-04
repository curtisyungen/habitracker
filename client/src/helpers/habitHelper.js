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
}
