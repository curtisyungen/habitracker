import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { habitAPI } from '../../utils';
import { getHabitsDueOnDate } from "../../utils/habitUtils";
import { Habit, HabitModal } from "../../components";
import moment from "moment";
import "./habitList.css";

const MODE = {
    ADD: 0,
    EDIT: 1,
    NONE: 2,
}

const HabitList = () => {
    const { user } = useAuth0();
    const [habits, setHabits] = useState([]);
    const [displayedHabits, setDisplayedHabits] = useState([]);
    const [mode, setMode] = useState(MODE.NONE);
    const [habitToEdit, setHabitToEdit] = useState(null);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

    useEffect(() => {
        getHabits();
    }, []);

    const getHabits = () => {
        habitAPI.getAllHabitsForUser(user.email).then(res => {
            setHabits(res.data);
            setDisplayedHabits(getHabitsDueOnDate(res.data, date));
        });
    }

    const scrollDate = (dir) => {
        setDate(moment(date).add(dir, "days").format("YYYY-MM-DD"));
        setDisplayedHabits(getHabitsDueOnDate(habits, date));
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
                <div className="date">{date}</div>
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
