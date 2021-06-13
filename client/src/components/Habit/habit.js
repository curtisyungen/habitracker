import React from 'react';

import "./habit.css";

const visibleFields = ["title", "description", "category"];

const Habit = ({ habit, onClick }) => {
    return (
        <div
            className="habit"
            style={{ gridTemplateColumns: `repeat(${visibleFields.length}, 1fr)` }}
            onClick={onClick}
        >
            {visibleFields.map(f => (
                <div key={f} className="habit-cell">{habit[f]}</div>
            ))}
        </div>
    )
}

export default Habit;
