import React, { useState, useEffect } from 'react';
import { Modal } from "react-responsive-modal";
import { useAuth0 } from "@auth0/auth0-react";
import { HABIT } from '../../res/main';
import { habitAPI, HabitUtils } from "../../utils";
import moment from "moment";
import c from "classnames";
import 'react-responsive-modal/styles.css';
import "./habitModal.css";
import "../../styles/main.css";

const DEFAULT_STATE = {
    title: null,
    description: null,
    habit_type: HABIT.TYPE.CHECK_OFF,
    category: HABIT.CATEGORY.FITNESS,
    frequency: [1, 2, 3, 4, 5, 6, 7],
    timeline: {},
    target: null,
    target_type: null,
    status: HABIT.STATUS.ACTIVE,
}

const HabitModal = ({ open, close, habit, callback }) => {
    const { user } = useAuth0();
    const [data, setData] = useState(DEFAULT_STATE);
    const [metrics, setMetrics] = useState({});
    const [inEditMode] = useState(!!habit);

    useEffect(() => {
        if (inEditMode) {
            setData(HabitUtils.unpackHabitData(habit));
            setMetrics(HabitUtils.getHabitMetrics(HabitUtils.unpackHabitData(habit)));
        }
    }, []);

    const updateData = (field, value) => {
        if (Array.isArray(data[field])) {
            data[field] = data[field].indexOf(value) > -1 ? data[field].filter(f => f !== value) : [...data[field], value];
        } else {
            data[field] = value;
        }

        setData({ ...data });
    }

    const submitHabit = e => {
        e.preventDefault();
        e.stopPropagation();

        if (HabitUtils.validateHabitData(data)) {
            if (inEditMode) {
                habitAPI.updateHabit(
                    user.email,
                    HabitUtils.packHabitData(data),
                ).then(() => {
                    callback();
                    close();
                });
            } else {
                habitAPI.createHabit(
                    user.email,
                    HabitUtils.packHabitData(data),
                ).then(() => {
                    callback();
                    close();
                });
            }
        }
    }

    return (
        <Modal
            open={open}
            onClose={close}
        >
            <h4>{inEditMode ? "Edit" : "Add"} Habit</h4>

            {/* TITLE */}
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Title</span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    onChange={e => updateData("title", e.target.value)}
                    defaultValue={data.title}
                    placeholder="Title"
                />
            </div>
            {/* DESCRIPTION */}
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Description</span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    onChange={e => updateData("description", e.target.value)}
                    defaultValue={data.description}
                    placeholder="Description"
                />
            </div>
            {/* HABIT TYPE */}
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Habit type</span>
                </div>
                <select
                    className="form-control"
                    onChange={e => updateData("habit_type", e.target.value)}
                    defaultValue={data.habit_type}
                >
                    {Object.keys(HABIT.TYPE).map(t => (
                        <option key={t} value={HABIT.TYPE[t]}>{HABIT.TYPE[t]}</option>
                    ))}
                </select>
            </div>
            {/* CATEGORY */}
            <div className="input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">Category</div>
                </div>
                <select
                    className="form-control"
                    onChange={e => updateData("category", e.target.value)}
                    defaultValue={data.category}
                >
                    {Object.keys(HABIT.CATEGORY).map(t => (
                        <option key={t} value={HABIT.CATEGORY[t]}>{HABIT.CATEGORY[t]}</option>
                    ))}
                </select>
            </div>
            {/* FREQUENCY */}
            <div className="input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">Frequency</div>
                </div>
                <div className="input-frequency">
                    {[1, 2, 3, 4, 5, 6, 7].map(d => (
                        <div
                            key={d}
                            className={c("input-clickable-highlight", { isSelected: data.frequency.indexOf(d) > -1 })}
                            onClick={() => updateData("frequency", d)}
                        >
                            {moment().day(d).format("ddd")}
                        </div>
                    ))}
                </div>
            </div>
            {/* TARGET */}
            {data.habit_type && data.habit_type === HABIT.TYPE.ENTER_VALUE ? (
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Target</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        onChange={e => updateData("target", e.target.value)}
                        defaultValue={data.target}
                        placeholder="Target"
                    />
                    <select
                        className="form-control"
                        onChange={e => updateData("target_type", e.target.value)}
                        defaultValue={data.target_type}
                    >
                        {Object.keys(HABIT.TARGET_TYPE).map(t => (
                            <option key={t} value={t}>{HABIT.TARGET_TYPE[t]}</option>
                        ))}
                    </select>
                </div>
            ) : (
                <></>
            )}
            {/* STATUS */}
            <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Status</span>
                    </div>
                    <select
                        className="form-control"
                        onChange={e => updateData("status", e.target.value)}
                        defaultValue={data.status}
                    >
                        {Object.keys(HABIT.STATUS).map(s => (
                            <option key={s} value={HABIT.STATUS[s]}>{HABIT.STATUS[s]}</option>
                        ))}
                    </select>
                </div>
            {/* METRICS */}
            <div className="habit-metrics">
                {Object.keys(metrics).map(m => (
                    <div key={m} className="habit-metrics-cell">
                        <div className="habit-metrics-title">{m}</div>
                        <div className="habit-metrics-value">{metrics[m]}</div>
                    </div>
                ))}
            </div>
            <button className="btn btn-success btn-sm btn-submit-habit" onClick={submitHabit}>Submit</button>
        </Modal>
    )
}

export default HabitModal;