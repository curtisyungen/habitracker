import React, { useState } from 'react';

import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { navigate } from 'hookrouter';

import { Loading } from "../components";

import { HABIT } from '../res/main';

import { prepHabitDataForSubmit, validateHabitData } from "../res/habitHelper";
import { habitAPI } from "../utils";

import moment from "moment";

import "./AddHabit.css";
import "../styles/main.css";

const DEFAULT_STATE = {
    title: null,
    description: null,
    habit_type: HABIT.TYPE.CHECK_OFF,
    start_date: moment().format("YYYY-MM-DD"),
    end_date: null,
    category: HABIT.CATEGORY.FITNESS,
    timeline: {},
    target: null,
    target_type: null,
    status: HABIT.STATUS.ACTIVE,
}

const AddHabit = () => {
    const { user } = useAuth0();
    const [data, setData] = useState(DEFAULT_STATE);

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

        if (validateHabitData(data)) {
            habitAPI.createHabit(
                user.email,
                prepHabitDataForSubmit(data),
            ).then(() => {
                alert("Habit submitted.");
                navigate("/");
            });
        }
    }

    return (
        <div className="page page-addHabit">
            <h4>Add Habit</h4>

            {/* TITLE */}
            <div className="input-group mb-3">
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
            <div className="input-group mb-3">
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
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Habit type</span>
                </div>
                <select
                    className="form-control"
                    onChange={e => updateData("habit_type", e.target.value)}
                    defaultValue={data.habit_type}
                >
                    {Object.keys(HABIT.TYPE).map(t => (
                        <option key={t} value={t}>{HABIT.TYPE[t]}</option>
                    ))}
                </select>
            </div>
            {/* START DATE */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Start date</span>
                </div>
                <input
                    type="date"
                    className="form-control"
                    onChange={e => updateData("start_date", e.target.value)}
                    defaultValue={data.start_date}
                />
            </div>
            {/* CATEGORY */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <div className="input-group-text">Category</div>
                </div>
                <select
                    className="form-control"
                    onChange={e => updateData("category", e.target.value)}
                    defaultValue={data.category}
                >
                    {Object.keys(HABIT.CATEGORY).map(t => (
                        <option key={t} value={t}>{HABIT.CATEGORY[t]}</option>
                    ))}
                </select>
            </div>
            {/* TARGET */}
            {data.habit_type && data.habit_type === HABIT.TYPE.ENTER_VALUE ? (
                <div className="input-group mb-3">
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
            <button className="btn btn-success btn-sm" onClick={submitHabit}>Submit</button>
        </div>
    )
}

export default withAuthenticationRequired(AddHabit, {
    onRedirecting: () => <Loading />,
});