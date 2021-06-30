import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { habitAPI, HabitUtils } from "../../utils";
import { HABIT } from "../../res/main";
import { getIcon } from "../../res/icons";
import c from "classnames";
import "./habit.css";

const Habit = ({ habit, date, onClick, onClickEdit, callback }) => {
    const { user } = useAuth0();
    const [data] = useState(HabitUtils.unpackHabitData(habit));
    const [metrics, setMetrics] = useState({});
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        setMetrics(HabitUtils.getHabitMetrics(data));
        checkIfComplete();
    }, [date]);

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
            <div className="habit-cell">{data["title"]}</div>
            <div
                className="habit-edit"
                onClick={onClickEdit}
            >
                {getIcon("edit")}
            </div>
            <div
                className="habit-cell habit-status"
                onClick={e => onComplete(e)}
            >
                {isCompleted ? "Complete" : "Incomplete"}
            </div>
        </div>
    )
}

export default Habit;
