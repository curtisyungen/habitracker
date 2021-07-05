import React, { useState, useEffect } from 'react';
import { Modal } from "react-responsive-modal";
import { useAuth0 } from "@auth0/auth0-react";
import { habitAPI, HabitUtils } from "../../utils";
import { MODE } from "../../utils/habitUtils";
import { HABIT } from '../../res/main';
import { getIcon } from "../../res/icons";
import c from "classnames";
import moment from "moment";
import "./habit.css";
import "../../styles/main.css";

const TODAY = moment().format("YYYY-MM-DD");

const Habit = ({ habit, dates, onClick, callback }) => {
    const { user } = useAuth0();
    const [data] = useState(HabitUtils.unpackHabitData(habit));
    const [metrics, setMetrics] = useState({});
    const [mode, setMode] = useState(MODE.NONE);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        getMetrics();
    }, []);

    const getMetrics = () => {
        setMetrics(HabitUtils.getHabitMetrics(data));
    }

    const onComplete = (e, date) => {
        e.preventDefault();
        e.stopPropagation();

        if (date > moment().format("YYYY-MM-DD")) {
            return;
        }

        if (data.habit_type === HABIT.TYPE.CHECK_OFF) {
            updateHabitTimeline(HabitUtils.updateHabitTimeline(data, date));
        } else {
            setSelectedDate(date);
            setMode(MODE.ENTER_VALUE);
        }
    }

    const updateHabitTimeline = (timeline) => {
        habitAPI.updateHabit(user.email, HabitUtils.packHabitData({ ...data, timeline })).then(() => {
            callback();
            getMetrics();
        });
    }

    return (
        <>
            <div
                className="habit"
                onClick={onClick}
            >
                <div className="habit-summary disable-select">
                    <div className="habit-summary-header">{data["title"]}</div>
                    <div className="habit-summary-body">
                        <div className="habit-summary-stat">Streak: {metrics["Current streak"]}</div>
                        <div className="habit-summary-stat">Total: {metrics["Total completions"]}</div>
                    </div>
                    <div className="habit-summary-footer">{data["category"]}</div>
                </div>

                {dates.map(d => (
                    <div
                        key={d}
                        className={c("habit-cell", {
                            isCompleted: HabitUtils.checkIfDateInTimeline(data, d),
                            isFuture: moment().format("YYYY-MM-DD") < d,
                            isToday: d === TODAY
                        })}
                        onClick={e => onComplete(e, d)}
                    >
                        <div className="habit-check">{HabitUtils.getCheckValueOrTarget(habit, d)}</div>
                    </div>
                ))}
            </div>

            {mode === MODE.ENTER_VALUE ? (
                <EnterValueModal
                    open={true}
                    close={(timeline) => {
                        updateHabitTimeline(timeline);
                        setMode(MODE.NONE);
                    }}
                    habit={data}
                    date={selectedDate}
                />
            ) : (
                <></>
            )}
        </>
    )
}

const EnterValueModal = ({ open, close, habit, date }) => {
    const [value, setValue] = useState(HabitUtils.getValueForDate(habit, date));

    const updateTimeline = () => {
        close(HabitUtils.updateHabitTimeline(habit, date, value));
    }

    return (
        <Modal
            open={open}
            onClose={() => updateTimeline()}
        >
            <h4>Enter value</h4>

            {/* VALUE */}
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">{date}</span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    defaultValue={value}
                    onChange={e => setValue(e.target.value)}
                />
                <button
                    className="btn btn-success btn-sm"
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        updateTimeline();
                    }}
                >
                    Submit
                </button>
            </div>
        </Modal>
    )
}

export default Habit;
