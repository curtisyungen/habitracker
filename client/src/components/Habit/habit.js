import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { habitAPI, HabitUtils } from "../../utils";
import { HABIT } from "../../res/main";
import c from "classnames";
import "./habit.css";

const visibleFields = [HABIT.FIELDS.TITLE.name, HABIT.FIELDS.CATEGORY.name];

const Habit = ({ habit, date, onClick, callback }) => {
    const { user } = useAuth0();
    const [data, setData] = useState(HabitUtils.unpackHabitData(habit));
    const [metrics, setMetrics] = useState({});
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        setMetrics(HabitUtils.getHabitMetrics(data));
    }, []);

    useEffect(() => {
        checkIfComplete();
    }, []);

    const checkIfComplete = () => {
        setIsCompleted(HabitUtils.checkIfDateInTimeline(data, date));
    }

    const onComplete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const timeline = HabitUtils.updateHabitTimeline(data, date);
        habitAPI.updateHabit(user.email, HabitUtils.packHabitData({ ...data, timeline })).then(() => {
            callback();
            checkIfComplete();
            setMetrics(HabitUtils.getHabitMetrics(data));
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

            <div className="habit-container-metrics">
                {Object.keys(metrics).map(m => (
                    <div key={m} className="habit-metric">
                        <div className="habit-metric-title">{m}</div>
                        <div className="habit-metric-value">{metrics[m]}</div>
                    </div>
                ))}
            </div>

            <button
                className={c("btn btn-sm", { "btn-success": !isCompleted, "btn-danger": isCompleted })}
                onClick={e => onComplete(e)}
            >
                {isCompleted ? "Incomplete" : "Complete"}
            </button>
        </div>
    )
}

export default Habit;
