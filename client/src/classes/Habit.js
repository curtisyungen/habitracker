import moment from "moment";

import { DateHelper, StringHelper } from "../helpers";
import { STATUS } from "../res";

export default class Habit {
    constructor({
        id,
        userId,
        title,
        description,
        type,
        category,
        target,
        targetType,
        timeline,
        status,
    }) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.type = type;
        this.category = category;
        this.target = target;
        this.targetType = targetType;
        this.timeline = StringHelper.parseJSON(timeline);
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

    getId = () => {
        return this.id;
    }

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
        return this.targetType;
    };

    getIsActive = () => {
        return this.status === STATUS.ACTIVE;
    };

    getBundledHabitData = () => {
        return {
            id: this.id,
            userId: this.userId,
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

    setTimeline = (timeline) => {
        this.timeline = StringHelper.parseJSON(timeline);
    };
}
