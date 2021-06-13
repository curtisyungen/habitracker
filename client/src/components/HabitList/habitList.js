import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { habitAPI } from '../../utils';
import { Habit, HabitModal } from "../../components";
import "./habitList.css";

const MODE = {
    ADD: 0,
    EDIT: 1,
    NONE: 2,
}

const HabitList = () => {
    const { user } = useAuth0();
    const [habits, setHabits] = useState([]);
    const [mode, setMode] = useState(MODE.NONE);
    const [habitToEdit, setHabitToEdit] = useState(null);

    useEffect(() => {
        habitAPI.getAllHabitsForUser(user.email).then(res => {
            setHabits(res.data);
        });
    }, []);

    return (
        <>
            <div className="habitList">
                <button className="btn btn-success btn-sm" onClick={() => { setMode(MODE.ADD) }}>Add</button>

                {habits.map(h => (
                    <Habit key={h.id} habit={h} onClick={() => { setHabitToEdit(h); setMode(MODE.EDIT); }} />
                ))}

                {habits.length === 0 && "No habits found."}
            </div>

            {mode !== MODE.NONE ? (
                <HabitModal
                    open={true}
                    close={() => { setHabitToEdit(null); setMode(MODE.NONE); }}
                    habit={habitToEdit}
                />
            ) : (
                <></>
            )}
        </>
    )
}

export default HabitList;
