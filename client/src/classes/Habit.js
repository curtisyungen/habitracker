import { STATUS } from "../res";

export default class Habit {
    constructor(
        userId,
        title,
        description,
        type,
        category,
        frequency,
        timeline,
        target,
        target_type,
        status
    ) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.type = type;
        this.category = category;
        this.frequency = frequency;
        this.timeline = timeline;
        this.target = target;
        this.target_type = target_type;
        this.status = status;
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
        return this.target_type;
    };

    getIsActive = () => {
        return this.status === STATUS.ACTIVE;
    };
}
