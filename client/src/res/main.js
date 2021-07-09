export const SITE_TITLE = "HABITRACKER";

export const BACKGROUND = {
    SWISS: { 
        title: "Swiss", 
        backgroundSize: "cover", 
        backgroundAttachment: "fixed", 
        backgroundImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3dpdHplcmxhbmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" 
    },
}

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

export const USER = {
    STATUS: {
        ACTIVE: "Active",
        INACTIVE: "Inactive",
    }
}

export const DEFAULT = {
    SETTINGS: {
        BACKGROUND: BACKGROUND.SWISS,
        CATEGORIES: { ...HABIT.CATEGORY },
    },
    STATUS: USER.STATUS.ACTIVE,
}