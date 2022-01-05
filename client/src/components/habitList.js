import classNames from "classnames";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { MainContext } from "../App";
import { HabitModal } from ".";
import { HabitHelper, ICON, IconHelper } from "../helpers";
import { Button, Grid, Text } from "../styles";
import { COLORS, FONT_SIZE, FONT_WEIGHT, TRANSITION } from "../styles/theme";
import { habitAPI } from "../utils";

const MODE = {
    ADD: "Add",
    EDIT: "Edit",
    NONE: "None",
};

const ButtonContainer = styled("div")`
    margin: 10px 0px;
`;

const Category = styled("div")`
    background: ${(props) => props.background || "transparent"};
    border: 0px;
    border-style: solid;
    border-top-width: 1px;
    bottom: 0;
    font-size: ${FONT_SIZE.S};
    height: 25px;
    left: 0;
    line-height: 25px;
    position: absolute;
    right: 0;
    text-align: center;
    width: 100%;
`;

const Day = styled("div")`
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    height: 100%;
    min-height: 50px;
    min-width: 50px;
    transition: ${TRANSITION.FAST};
    width: 100%;
`;

const Habit = styled("div")`
    display: grid;
    grid-gap: 2px;
    grid-template-columns: repeat(8, 1fr);
    margin-top: 2px;
    min-width: 100%;
    width: 100%;
`;

const ListBody = styled("div")`
    margin-top: 4px;
`;

const ListContainer = styled("div")`
    overflow-y: scroll;
    position: relative;
    width: 100%;
`;

const ListControls = styled("div")`
    margin: 10px 0px;
    width: 100%;
`;

const ListHeader = styled("div")`
    display: grid;
    grid-gap: 2px;
    grid-template-columns: repeat(8, 1fr);
    font-size: ${FONT_SIZE.S};
    height: 100%;
    min-width: 100%;
    text-align: center;
    width: 100%;

    & div {
    }
`;

const TitleContainer = styled("div")`
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    font-size: ${FONT_SIZE.M};
    font-weight: ${FONT_WEIGHT.BOLD};
    position: relative;
    text-align: center;
    text-transform: capitalize;
    width: 100%;
`;

const HabitList = ({}) => {
    const { state } = useContext(MainContext);
    const [date, setDate] = useState(HabitHelper.momentizeDate().currWeekStart);
    const [habits, setHabits] = useState(null);
    const [mode, setMode] = useState(MODE.NONE);
    const [selectedHabit, setSelectedHabit] = useState(null);

    useEffect(() => {
        if (!state.currentUser) return;
        loadHabits();
    }, [state.currentUser]);

    const loadHabits = () => {
        habitAPI
            .getAllHabitsForUser(state.currentUser.getUserId())
            .then((res) => {
                setHabits(
                    res.data.map((i) => HabitHelper.getUnbundledHabitData(i))
                );
            });
    };

    const createOrUpdateHabit = (habitData) => {
        switch (mode) {
            case MODE.ADD:
                habitAPI
                    .createHabit(
                        state.currentUser.getUserId(),
                        HabitHelper.getBundledHabitData(habitData)
                    )
                    .then(() => {
                        loadHabits();
                        setMode(MODE.NONE);
                    });
                break;
            case MODE.EDIT:
                habitAPI
                    .updateHabit(
                        state.currentUser.getUserId(),
                        habitData.id,
                        HabitHelper.getBundledHabitData(habitData)
                    )
                    .then(() => {
                        loadHabits();
                        setMode(MODE.NONE);
                        setSelectedHabit(null);
                    });
            default:
                return;
        }
    };

    const onDayClicked = (habit, day) => {
        const year = HabitHelper.momentizeDate(date).year;
        const month = HabitHelper.momentizeDate(date).month;
        const _date = moment(date).add(day, "days").format("D");

        const timeline = JSON.parse(JSON.stringify(habit.timeline));
        if (!timeline[year]) {
            timeline[year] = {};
        }

        if (!timeline[year][month]) {
            timeline[year][month] = {};
        }

        if (timeline[year][month][_date]) {
            delete timeline[year][month][_date];
        } else {
            timeline[year][month][_date] = true;
        }
        habitAPI
            .updateHabit(state.currentUser.getUserId(), habit.id, {
                timeline: JSON.stringify(timeline),
            })
            .then(() => {
                loadHabits();
            });
    };

    const scrollDate = (dir) => {
        switch (dir) {
            case -1:
                setDate(HabitHelper.momentizeDate(date).prevWeekStart);
                break;
            case 1:
                setDate(HabitHelper.momentizeDate(date).nextWeekStart);
                break;
            case 0:
            default:
                setDate(HabitHelper.momentizeDate().currWeekStart);
        }
    };

    if (!habits) {
        return <></>;
    }

    return (
        <ListContainer>
            <ButtonContainer>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        setMode(MODE.ADD);
                    }}
                    width="100px"
                >
                    {IconHelper.getIcon(ICON.ADD)}
                </Button>
            </ButtonContainer>
            <ListControls>
                <Grid gridTemplateColumns="repeat(3, 1fr)" width="300px">
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            scrollDate(-1);
                        }}
                    >
                        {IconHelper.getIcon(ICON.LEFT)}
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            scrollDate(0);
                        }}
                        width="150px"
                    >
                        {date}
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            scrollDate(1);
                        }}
                    >
                        {IconHelper.getIcon(ICON.RIGHT)}
                    </Button>
                </Grid>
            </ListControls>
            <ListHeader>
                <Text className="background borderColor">Title</Text>
                {[...new Array(6)].map((d, idx) => (
                    <Text key={idx} className="background borderColor">
                        <Text>
                            {moment(date).add(idx, "days").format("dddd")}
                        </Text>
                        <Text>
                            {moment(date).add(idx, "days").format("YYYY-MM-DD")}
                        </Text>
                    </Text>
                ))}
            </ListHeader>
            <ListBody>
                {habits.map((habit, idx) => (
                    <Habit key={idx}>
                        <TitleContainer
                            className="background borderColor"
                            onClick={() => {
                                setSelectedHabit(habit);
                                setMode(MODE.EDIT);
                            }}
                        >
                            <Text>{habit.title}</Text>
                            <Category
                                background={COLORS.CATEGORY[habit.category]}
                            >
                                {habit.category}
                            </Category>
                        </TitleContainer>
                        {[0, 1, 2, 3, 4, 5, 6].map((day, idx) => (
                            <Day
                                key={idx}
                                className={
                                    ("backgroundHoverable",
                                    classNames({
                                        highlight:
                                            HabitHelper.getDateInTimeline(
                                                habit,
                                                moment(date).add(idx, "days")
                                            ),
                                    }))
                                }
                                onClick={() => {
                                    onDayClicked(habit, day);
                                }}
                            ></Day>
                        ))}
                    </Habit>
                ))}
            </ListBody>
            <HabitModal
                open={mode !== MODE.NONE}
                close={() => setMode(MODE.NONE)}
                habitData={selectedHabit}
                setHabitData={createOrUpdateHabit}
            />
        </ListContainer>
    );
};

export default HabitList;
