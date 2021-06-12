import React, { useState, useEffect } from 'react';

import { useAuth0 } from "@auth0/auth0-react";

import { habitAPI } from '../../utils';

import { Habit } from "../../components";

import "./habitList.css";

const HabitList = () => {
    const { user } = useAuth0();
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        habitAPI.getAllHabitsForUser(user.email).then(res => {
            setHabits(res.data);
        });
    }, []);

    return (
        <div className="habitList">
            {habits.map(h => (
                <Habit key={h.id} habit={h} />
            ))}

            {habits.length === 0 && "No habits found."}
        </div>
    )
}

export default HabitList;
