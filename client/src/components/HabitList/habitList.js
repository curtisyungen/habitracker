import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { habitAPI, HabitUtils } from '../../utils';
import { MODE, FILTER, VIEW } from "../../utils/habitUtils";
import { Habit, HabitModal } from "../../components";
import moment from "moment";
import "./habitList.css";

const HabitList = () => {
    const { user } = useAuth0();
    const [habits, setHabits] = useState([]);
    const [displayedHabits, setDisplayedHabits] = useState([]);
    const [mode, setMode] = useState(MODE.NONE);
    const [habitToEdit, setHabitToEdit] = useState(null);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [filter, setFilter] = useState(FILTER.DUE);

    useEffect(() => {
        getHabits();
    }, []);

    const getHabits = () => {
        habitAPI.getAllHabitsForUser(user.email).then(res => {
            setHabits(res.data);
            setDisplayedHabits(HabitUtils.filterHabits(res.data, filter, date));
        });
    }

    const scrollDate = (dir) => {
        const newDate = moment(date).add(dir, "days").format("YYYY-MM-DD");
        setDate(newDate);
        setDisplayedHabits(HabitUtils.filterHabits(habits, filter, newDate));
    }

    const changeFilter = (filter) => {
        setDisplayedHabits(HabitUtils.filterHabits(habits, filter, date));
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
                <div className="btn btn-outline-dark btn-sm date">{date}</div>
                <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={e => {
                        e.preventDefault();
                        scrollDate(1);
                    }}
                >
                    Right
                </button>
            </div>
            <div className="habitList">
                <button className="btn btn-success btn-sm" onClick={() => { setMode(MODE.ADD) }}>Add</button>
                <select
                    className="btn btn-outline-dark btn-sm"
                    onChange={e => changeFilter(e.target.value)}
                    defaultValue={filter}
                >
                    {Object.keys(FILTER).map(f => (
                        <option key={f} value={FILTER[f]}>{FILTER[f]}</option>
                    ))}
                </select>

                {displayedHabits.map(h => (
                    <Habit
                        key={h.id}
                        habit={h}
                        date={date}
                        onClick={() => {
                            setHabitToEdit(h);
                            setMode(MODE.EDIT);
                        }}
                        callback={() => { getHabits(); }}
                    />
                ))}

                {displayedHabits.length === 0 && "No habits found."}
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
