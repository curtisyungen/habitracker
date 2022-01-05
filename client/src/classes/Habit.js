import moment from "moment";

import { DateHelper, StringHelper } from "../helpers";
import { STATUS } from "../res";
import { habitAPI } from "../utils";

export default class Habit {
    constructor(
        id,
        userId,
        title,
        description,
        type,
        category,
        target,
        target_type,
        timeline,
        status
    ) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.type = type;
        this.category = category;
        this.timeline = StringHelper.parseJSON(timeline);
        this.target = target;
        this.target_type = target_type;
        this.status = status;

        this.calculateMetrics();
    }

    calculateMetrics = () => {
        let currStreak = 0,
            earliestCompletion,
            longestStreak = 0,
            mostRecentCompletion,
            totalCompletions = 0;

        const startDate = moment("2020-09-01").format("YYYY-MM-DD");
        const endDate = moment().format("YYYY-MM-DD");

        let currDate = startDate;
        while (currDate <= endDate) {
            if (this.getDateInTimeline(currDate)) {
                if (!earliestCompletion) {
                    earliestCompletion = currDate;
                }
                currStreak += 1;
                longestStreak = Math.max(longestStreak, currStreak);
                mostRecentCompletion = currDate;
                totalCompletions += 1;
            } else {
                currStreak = 0;
            }
            currDate = moment(currDate).add(1, "days").format("YYYY-MM-DD");
        }

        this.metrics = {
            currStreak,
            earliestCompletion,
            longestStreak,
            mostRecentCompletion,
            totalCompletions,
        };
    };

    getTitle = () => {
        return this.title;
    };

    getDescription = () => {
        return this.description;
    };

    getType = () => {
        return this.type;
    };

    getCategory = () => {
        return this.category;
    };

    getFrequency = () => {
        return this.frequency;
    };

    getTimeline = () => {
        return this.timeline;
    };

    getTarget = () => {
        return this.target;
    };

    getTargetType = () => {
        return this.target_type;
    };

    getIsActive = () => {
        return this.status === STATUS.ACTIVE;
    };

    getBundledHabitData = () => {
        return {
            title: this.title,
            description: this.description,
            type: this.type,
            category: this.category,
            target: this.target,
            targetType: this.targetType,
            timeline: StringHelper.stringifyJSON(this.timeline),
            status: this.status,
        };
    };

    getDateInTimeline = (targetDate) => {
        const { year, month, day } = DateHelper.getYearMonthDay(targetDate);
        if (
            this.timeline[year] &&
            this.timeline[year][month] &&
            this.timeline[year][month][day]
        ) {
            return this.timeline[year][month][day];
        }
        return false;
    };

    getMetrics = () => {
        return this.metrics;
    };

    updateDateInTimeline = (date, value) => {
        const { year, month, day } = DateHelper.getYearMonthDay(date);

        if (!this.timeline[year]) {
            this.timeline[year] = {};
        }

        if (!this.timeline[year][month]) {
            this.timeline[year][month] = {};
        }

        if (!this.timeline[year][month][day]) {
            this.timeline[year][month][day] = value;
        } else {
            delete this.timeline[year][month][day];

            if (Object.keys(this.timeline[year][month]).length === 0) {
                delete this.timeline[year][month];

                if (Object.keys(this.timeline[year]).length === 0) {
                    delete this.timeline[year];
                }
            }
        }

        habitAPI.updateHabit(this.userId, this.id, {
            timeline: JSON.stringify(this.timeline),
        });
    };
}
