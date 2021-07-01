import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { habitAPI, HabitUtils } from "../../utils";
import c from "classnames";
import moment from "moment";
import "./habit.css";

const TODAY = moment().format("YYYY-MM-DD");

const Habit = ({ habit, dates, onClick, callback }) => {
    const { user } = useAuth0();
    const [data] = useState(HabitUtils.unpackHabitData(habit));
    const [metrics, setMetrics] = useState({});

    useEffect(() => {
        getMetrics();
    }, [])

    const getMetrics = () => {
        setMetrics(HabitUtils.getHabitMetrics(data));
    }

    const onComplete = (e, date) => {
        e.preventDefault();
        e.stopPropagation();

        const timeline = HabitUtils.updateHabitTimeline(data, date);
        habitAPI.updateHabit(user.email, HabitUtils.packHabitData({ ...data, timeline })).then(() => {
            callback();
            getMetrics();
        });
    }

    return (
        <div
            className="habit"
            onClick={onClick}
        >
            <div className="habit-cell">
                {data["title"]}
                <div>
                    <div className="habit-cell-sub">Total: {metrics["Total completions"]}</div>
                    <div className="habit-cell-sub">CS: {metrics["Current streak"]}</div>
                </div>
            </div>
            {dates.map(d => (
                <div
                    key={d}
                    className={c("habit-cell", { isCompleted: HabitUtils.checkIfDateInTimeline(data, d), isToday: d === TODAY })}
                    onClick={e => onComplete(e, d)}
                />
            ))}
        </div>
    )
}

export default Habit;
