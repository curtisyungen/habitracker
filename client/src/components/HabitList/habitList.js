import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { habitAPI, HabitUtils } from '../../utils';
import { MODE, FILTER } from "../../utils/habitUtils";
import { Habit, HabitModal } from "../../components";
import { getIcon } from "../../res/icons";
import moment from "moment";
import "./habitList.css";

const HabitList = () => {
    const { user } = useAuth0();
    const [habits, setHabits] = useState([]);
    const [displayedHabits, setDisplayedHabits] = useState([]);
    const [monday, setMonday] = useState(moment().day("monday").format("YYYY-MM-DD"));
    const [dates, setDates] = useState([]);
    const [filter, setFilter] = useState(FILTER.ALL);
    const [mode, setMode] = useState(MODE.NONE);
    const [habitToEdit, setHabitToEdit] = useState(null);

    useEffect(() => {
        loadDates(monday);
        getHabits();
    }, []);

    const getHabits = () => {
        habitAPI.getAllHabitsForUser(user.email).then(res => {
            setHabits(res.data);
            setDisplayedHabits(HabitUtils.filterHabits(res.data, filter, moment().format("YYYY-MM-DD")));
        });
    }

    const loadDates = (monday) => {
        setDates([0, 1, 2, 3, 4, 5, 6].map(d => moment(monday).add(d, "days").format("YYYY-MM-DD")));
    }

    const scrollDate = (dir) => {
        const newMonday = moment(monday).add(dir * 7, "days").format("YYYY-MM-DD");
        setMonday(newMonday);
        loadDates(newMonday);
    }

    const changeFilter = (filter) => {
        setDisplayedHabits(HabitUtils.filterHabits(habits, filter, moment().format("YYYY-MM-DD")));
        setFilter(filter);
    }

    return (
        <div className="habitListContainer">
            <div className="habitListControls">
                <select
                    className="btn btn-outline-dark btn-sm"
                    onChange={e => changeFilter(e.target.value)}
                    defaultValue={filter}
                >
                    {Object.keys(FILTER).map(f => (
                        <option key={f} value={FILTER[f]}>{FILTER[f]}</option>
                    ))}
                </select>
                <div
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => scrollDate(-1)}
                >
                    {getIcon("left")}
                </div>
                <div
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => scrollDate(1)}
                >
                    {getIcon("right")}
                </div>
                <div
                    className="btn btn-success btn-sm btn-add-habit"
                    onClick={() => { setMode(MODE.ADD) }}
                >
                    {getIcon("add")}
                </div>
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
        </div>
    )
}

export default HabitList;
