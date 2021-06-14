import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { habitAPI } from "../../utils";
import { packHabitData, unpackHabitData, updateHabitTimeline } from '../../utils/habitUtils';
import "./habit.css";

const visibleFields = ["title", "description", "category"];

const Habit = ({ habit, date, onClick }) => {
    const { user } = useAuth0();
    const [data, setData] = useState(unpackHabitData(habit));

    const onComplete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const timeline = updateHabitTimeline(data, date);
        habitAPI.updateHabit(user.email, packHabitData({ ...data, timeline })).then(res => {
            console.log(res);
        });
    }

    return (
        <div
            className="habit"
            style={{ gridTemplateColumns: `repeat(${visibleFields.length}, 1fr)` }}
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
