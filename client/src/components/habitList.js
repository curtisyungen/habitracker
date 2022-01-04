import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { MainContext } from "../App";
import { HabitModal } from ".";
import { HabitHelper, ICON, IconHelper } from "../helpers";
import { Button, Flex, Text } from "../styles";
import { COLORS, FONT_SIZE, FONT_WEIGHT } from "../styles/theme";
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
    height: 100%;
    min-height: 50px;
    min-width: 50px;
    width: 100%;
`;

const Habit = styled("div")`
    display: grid;
    grid-gap: 2px;
    grid-template-columns: repeat(8, 1fr);
    margin-top: 4px;
    min-width: 100%;
    width: 100%;
`;

const ListContainer = styled("div")`
    overflow-y: scroll;
    position: relative;
    width: 100%;
`;

const ListHeader = styled("div")`
    display: grid;
    grid-gap: 2px;
    grid-template-columns: repeat(8, 1fr);
    font-size: ${FONT_SIZE.S};
    height: 30px;
    line-height: 30px;
    min-width: 100%;
    text-align: center;
    width: 100%;

    & div {
        border-style: solid;
        border-width: 1px;
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
                setHabits(res.data);
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
            <ListHeader>
                <Text className="background borderColor">Title</Text>
                {[0, 1, 2, 3, 4, 5, 6].map((d, idx) => (
                    <Text key={idx} className="background borderColor">
                        {moment().day(d).format("ddd")}
                    </Text>
                ))}
            </ListHeader>
            {habits.map((h, idx) => (
                <Habit key={idx}>
                    <TitleContainer
                        className="background borderColor"
                        onClick={() => setSelectedHabit(h)}
                    >
                        <Text>{h.title}</Text>
                        <Category background={COLORS.CATEGORY[h.category]}>
                            {h.category}
                        </Category>
                    </TitleContainer>
                    {[0, 1, 2, 3, 4, 5, 6].map((d, idx) => (
                        <Day key={idx}></Day>
                    ))}
                </Habit>
            ))}
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
