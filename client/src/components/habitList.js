import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { MainContext } from "../App";
import { HabitModal } from ".";
import { ICON, IconHelper } from "../helpers";
import { Button, Flex } from "../styles";
import { FONT_SIZE } from "../styles/theme";
import { habitAPI } from "../utils";

const MODE = {
    ADD: "Add",
    EDIT: "Edit",
    NONE: "None",
};

const ButtonContainer = styled("div")``;

const Container = styled("div")`
    overflow-y: scroll;
    position: relative;
    width: 100%;
`;

const Day = styled("div")`
    border-style: solid;
    border-width: 1px;
    height: 100%;
    min-height: 50px;
    min-width: 50px;
    width: 100%;
`;

const Habit = styled("div")`
    display: grid;
    grid-gap: 2px;
    grid-template-columns: repeat(8, 1fr);
    min-width: 100%;
    width: 100%;
`;

const HabitTitle = styled("div")`
    cursor: pointer;
    position: relative;
`;

const HabitList = ({}) => {
    const { state } = useContext(MainContext);
    const [habits, setHabits] = useState(null);
    const [selectedHabit, setSelectedHabit] = useState(null);
    const [mode, setMode] = useState(MODE.NONE);

    useEffect(() => {
        if (!state.currentUser) return;
        habitAPI
            .getAllHabitsForUser(state.currentUser.getUserId())
            .then((res) => {
                setHabits(res.data);
            });
    }, [state.currentUser]);

    const setHabitData = (habitData) => {};

    if (!habits) {
        return <></>;
    }

    return (
        <Container>
            <ButtonContainer>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        setMode(MODE.ADD);
                    }}
                >
                    {IconHelper.getIcon(ICON.ADD)}
                </Button>
            </ButtonContainer>
            {habits.map((h, idx) => (
                <Habit key={idx}>
                    <HabitTitle>{h.title}</HabitTitle>
                    {[0, 1, 2, 3, 4, 5, 6].map((d, idx) => (
                        <Day key={idx}>{moment().day(d).format("ddd")}</Day>
                    ))}
                </Habit>
            ))}

            <HabitModal
                open={mode !== MODE.NONE}
                close={() => setMode(MODE.NONE)}
                habitData={selectedHabit}
                setHabitData={setHabitData}
            />
        </Container>
    );
};

export default HabitList;
