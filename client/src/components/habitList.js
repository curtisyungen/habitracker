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

const HabitList = ({}) => {
    const { state } = useContext(MainContext);
    const [date, setDate] = useState(HabitHelper.momentizeDate().currWeekStart);
    const [habits, setHabits] = useState(null);
    const [inAddMode, setInAddMode] = useState(false);

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
                    {[...new Array(7)].map((d, idx) => (
                        <Text key={idx} className="background borderColor">
                            <Text>
                                {moment(date).add(idx, "days").format("dddd")}
                            </Text>
                            <Text>
                                {moment(date)
                                    .add(idx, "days")
                                    .format("YYYY-MM-DD")}
                            </Text>
                        </Text>
                    ))}
                </ListHeader>
                <ListBody>
                    {habits.map((habit, idx) => (
                        <Habit key={idx} habit={habit} />
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
