import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { habitAPI, HabitUtils } from '../../utils';
import { MODE, FILTER } from "../../utils/habitUtils";
import { Habit, HabitModal } from "../../components";
import moment from "moment";
import "./habitList.css";

const HabitList = () => {
    const { user } = useAuth0();
    const [habits, setHabits] = useState([]);
    const [displayedHabits, setDisplayedHabits] = useState([]);
    const [dates, setDates] = useState([]);
    const [monday, setMonday] = useState(moment().day("monday").format("YYYY-MM-DD"));
    const [filter, setFilter] = useState(FILTER.ALL);
    const [mode, setMode] = useState(MODE.NONE);
    const [habitToEdit, setHabitToEdit] = useState(null);

    useEffect(() => {
        loadDates();
        getHabits();
    }, []);

    const getHabits = () => {
        habitAPI.getAllHabitsForUser(user.email).then(res => {
            setHabits(res.data);
            setDisplayedHabits(HabitUtils.filterHabits(res.data, filter));
        });
    }

    const loadDates = () => {
        setDates([0, 1, 2, 3, 4, 5, 6].map(d => moment(monday).add(d, "days").format("YYYY-MM-DD")));
    }

    const scrollDate = (dir) => {
        setMonday(moment(monday).add(dir * 7, "days").format("YYYY-MM-DD"));
        loadDates();
    }

    const changeFilter = (filter) => {
        setDisplayedHabits(HabitUtils.filterHabits(habits, filter));
        setFilter(filter);
    }

    return (
        <>
            <div className="habitListControls">
                <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={e => {
                        e.preventDefault();
                        scrollDate(-1);
                    }}
                >
                    Left
                </button>
                <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={e => {
                        e.preventDefault();
                        scrollDate(1);
                    }}
                >
                    Right
                </button>

                <select
                    className="btn btn-outline-dark btn-sm"
                    onChange={e => changeFilter(e.target.value)}
                    defaultValue={filter}
                >
                    {Object.keys(FILTER).map(f => (
                        <option key={f} value={FILTER[f]}>{FILTER[f]}</option>
                    ))}
                </select>

                <button className="btn btn-success btn-sm btn-add" onClick={() => { setMode(MODE.ADD) }}>Add</button>

            </div>
            <div className="habitList">
                <div className="habitListHeader">
                    <div className="habitListHeader-sort">
                        Empty
                    </div>
                    {dates.map(d => (
                        <div key={d} className="habitList-date">
                            <div className="habitList-date-name">{moment(d).format("dddd")}</div>
                            <div className="habitList-date-value">{d}</div>
                        </div>
                    ))}
                </div>
                <div className="habitListBody">
                    {displayedHabits.map(h => (
                        <Habit
                            key={h.id}
                            habit={h}
                            dates={dates}
                            onClick={() => {
                                setHabitToEdit(h);
                                setMode(MODE.EDIT);
                            }}
                            callback={() => { getHabits(); }}
                        />
                    ))}

                    {displayedHabits.length === 0 && <div className="text-center mt-3">No habits found.</div>}
                </div>
            </div>

            {mode !== MODE.NONE ? (
                <HabitModal
                    open={true}
                    close={() => { setHabitToEdit(null); setMode(MODE.NONE); }}
                    habit={habitToEdit}
                    callback={() => { getHabits(); }}
                />
            ) : (
                <></>
            )}
        </>
    )
}

export default HabitList;
