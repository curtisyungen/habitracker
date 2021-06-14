import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { habitAPI } from "../../utils";
import { HABIT } from "../../res/main";
import { packHabitData, unpackHabitData, momentizeDate, updateHabitTimeline } from '../../utils/habitUtils';
import c from "classnames";
import "./habit.css";

const visibleFields = [HABIT.FIELDS.TITLE.name, HABIT.FIELDS.CATEGORY.name];

const Habit = ({ habit, date, onClick, callback }) => {
    const { user } = useAuth0();
    const [data, setData] = useState(unpackHabitData(habit));
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const timeline = data.timeline;
        const { year, month, day } = momentizeDate(date);

        if (timeline[year] && timeline[year][month]) {
            setIsCompleted(timeline[year][month].indexOf(day) > -1);
        }
    }, []);

    const onComplete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const timeline = updateHabitTimeline(data, date);
        habitAPI.updateHabit(user.email, packHabitData({ ...data, timeline })).then(res => {
            callback();
            setData({ ...data, timeline });
        });
    }

    return (
        <div
            className={c("habit", { isCompleted })}
            onClick={onClick}
        >
            {visibleFields.map(f => (
                <div key={f} className="habit-cell">{data[f]}</div>
            ))}

            <button
                className="btn btn-success btn-sm"
                onClick={e => onComplete(e)}
            >
                Complete
            </button>
        </div>
    )
}

export default Habit;
