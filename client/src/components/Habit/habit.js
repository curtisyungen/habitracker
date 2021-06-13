import React from 'react';

import "./habit.css";

const visibleFields = ["title", "description", "category"];

const Habit = ({ habit }) => {
    return (
        <div className="habit" style={{ gridTemplateColumns: `repeat(${visibleFields.length}, 1fr)` }}>
            {visibleFields.map(f => (
                <div className="habit-cell">{habit[f]}</div>
            ))}
        </div>
    )
}

export default Habit;
