export const SITE_TITLE = "HABITRACKER";

export const HABIT = {
    CATEGORY: {
        FITNESS: "Fitness",
        HEALTH: "Health",
        RECREATION: "Recreation",
    },
    FIELDS: {
        TITLE: { name: "title", required: true },
        DESCRIPTION: { name: "description", required: false },
        HABIT_TYPE: { name: "habit_type", required: true },
        START_DATE: { name: "start_date", required: true },
        END_DATE: { name: "end_date", required: false },
        CATEGORY: { name: "category", required: true },
        FREQUENCY: { name: "frequency", required: true },
        TIMELINE: { name: "timeline", required: true },
        TARGET: { name: "target", required: false },
        TARGET_TYPE: { name: "target_type", required: false },
        STATUS: { name: "status", required: true },
    },
    FREQUENCY: {
        DAILY: "Daily",
        SPECIFIC_DAYS: "Specific days",
        TIMES_PER_WEEK: "X times per week",
    },
    STATUS: {
        ACTIVE: "Active",
        INACTIVE: "Inactive",
    },
    TARGET_TYPE: {
        QUANTITY: "Quantity",
        TIME: "Time",
    },
    TYPE: {
        CHECK_OFF: "Check off",
        ENTER_VALUE: "Enter value",
    }
}

export const USER = {
    STATUS: {
        ACTIVE: "Active",
        INACTIVE: "Inactive",
    }
}

export const DEFAULT = {
    SETTINGS: {},
    STATUS: USER.STATUS.ACTIVE,
}