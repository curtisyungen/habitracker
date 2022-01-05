import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";

import { MainContext } from "../App";
import { Habit, HabitModal } from ".";
import { HabitHelper, ICON, IconHelper } from "../helpers";
import { Button, Grid, Text } from "../styles";
import { FONT_SIZE } from "../styles/theme";
import { habitAPI } from "../utils";

const ButtonContainer = styled("div")`
    margin: 10px 0px;
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
`;

const HabitList = () => {
    const { state } = useContext(MainContext);
    const [startDate, setStartDate] = useState(
        HabitHelper.momentizeDate().currWeekStart
    );
    const [dates, setDates] = useState(null);
    const [habits, setHabits] = useState(null);
    const [inAddMode, setInAddMode] = useState(false);

    useEffect(() => {
        if (!state.currentUser) return;
        loadHabits();
    }, [state.currentUser]);

    useEffect(() => {
        setDates(
            [0, 1, 2, 3, 4, 5, 6].map((i) =>
                moment(startDate).add(i, "days").format("YYYY-MM-DD")
            )
        );
    }, [startDate]);

    const loadHabits = () => {
        habitAPI
            .getAllHabitsForUser(state.currentUser.getUserId())
            .then((res) => {
                setHabits(
                    res.data.map((i) => HabitHelper.getUnbundledHabitData(i))
                );
            });
    };

    const createHabit = (habitData) => {
        habitAPI
            .createHabit(
                state.currentUser.getUserId(),
                HabitHelper.getBundledHabitData(habitData)
            )
            .then(() => {
                loadHabits();
                setInAddMode(false);
            });
    };

    const scrollDate = (dir) => {
        switch (dir) {
            case -1:
                setStartDate(
                    HabitHelper.momentizeDate(startDate).prevWeekStart
                );
                break;
            case 1:
                setStartDate(
                    HabitHelper.momentizeDate(startDate).nextWeekStart
                );
                break;
            case 0:
            default:
                setStartDate(HabitHelper.momentizeDate().currWeekStart);
        }
    };

    if (!habits) {
        return <></>;
    }

    return (
        <>
            <ListContainer>
                <ButtonContainer>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            setInAddMode(true);
                        }}
                        width="100px"
                    >
                        {IconHelper.getIcon(ICON.ADD)}
                    </Button>
                </ButtonContainer>
                <ListControls>
                    <Grid
                        gridTemplateColumns="repeat(3, 1fr)"
                        margin="auto"
                        width="300px"
                    >
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
                            {startDate}
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
                    {dates.map((d, idx) => (
                        <Text key={idx} className="background borderColor">
                            <Text>{moment(d).format("dddd")}</Text>
                            <Text>{d}</Text>
                        </Text>
                    ))}
                </ListHeader>
                <ListBody>
                    {habits.map((habit, idx) => (
                        <Habit key={idx} habit={habit} dates={dates} />
                    ))}
                </ListBody>
            </ListContainer>
            <HabitModal
                open={inAddMode}
                close={() => setInAddMode(false)}
                habitData={null}
                setHabitData={createHabit}
            />
        </>
    );
};

export default HabitList;
