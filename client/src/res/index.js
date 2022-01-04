export const HABIT = {
    CATEGORY: {
        FITNESS: { name: "Fitness", color: "green"},
        HEALTH: { name: "Health", color: "blue" },
        PERSONAL: { name: "Personal", color: "tan" },
        RECREATION: { name: "Recreation", color: "purple" },
        WORK: { name: "Work", color: "gray" },
    },
    FIELDS: {
        TITLE: { name: "title", required: true },
        DESCRIPTION: { name: "description", required: false },
        HABIT_TYPE: { name: "habit_type", required: true },
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

export const PAGES = {
    ERROR: "/error",
    HOME: "/home",
    LOGIN_REDIRECT: "/loginRedirect",
}

export const SITE_TITLE = "HABITRACKER";

export const STATUS = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
}

export const VALIDATION = {
    AUTH0_CLIENT_ID = "gw8kILOU1QVBI7iI2cwNGZp0zBNOV9Cg",
    AUTH0_DOMAIN = "dev-sjy6qpev.us.auth0.com",
}