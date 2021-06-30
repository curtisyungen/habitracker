import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { habitAPI, HabitUtils } from "../../utils";
import c from "classnames";
import "./habit.css";

const Habit = ({ habit, dates, onClick, callback }) => {
    const { user } = useAuth0();
    const [data] = useState(HabitUtils.unpackHabitData(habit));

    const onComplete = (date) => {
        const timeline = HabitUtils.updateHabitTimeline(data, date);
        habitAPI.updateHabit(user.email, HabitUtils.packHabitData({ ...data, timeline })).then(() => {
            callback();
        });
    }

    return (
        <div
            className="habit"
            onClick={onClick}
        >
            <div className="habit-cell">{data["title"]}</div>
            {dates.map(d => (
                <div
                    key={d}
                    className={c("habit-cell", { isCompleted: HabitUtils.checkIfDateInTimeline(data, d) })}
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        onComplete(d)
                    }}
                />
            ))}
        </div>
    )
}

export default Habit;
