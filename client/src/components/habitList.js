import classNames from "classnames";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { MainContext } from "../App";
import { HabitModal, ModalContainer } from ".";
import { HabitHelper, ICON, IconHelper } from "../helpers";
import { HABIT, SIZE } from "../res";
import {
    Button,
    Flex,
    Label,
    Grid,
    Input,
    LabelPrepend,
    Text,
} from "../styles";
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

const CompleteIcon = styled("div")`
    font-size: ${FONT_SIZE.XXXL};
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`;

const Day = styled("div")`
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    height: 100%;
    min-height: ${SIZE.HABIT_HEIGHT};
    min-width: ${SIZE.HABIT_HEIGHT};
    position: relative;
    text-align: center;
    transition: ${TRANSITION.FAST};
    width: 100%;

    &.disabled ${CompleteIcon} {
        display: none;
    }

    &.enterValue .highlight ${CompleteIcon} {
        display: none;
    }

    &.highlight {
        & ${CompleteIcon} {
            color: black;
            opacity: 1;
        }

        &:hover {
            ${CompleteIcon} {
                color: black;
                opacity: 1;
            }
        }
    }

    &:hover {
        & ${CompleteIcon} {
            opacity: 0.5;
        }
    }

    & div {
        position: absolute;
        top: 50%;
        text-align: center;
        transform: translateY(-50%);
        width: 100%;
    }
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
`;

const TitleContainer = styled("div")`
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    font-size: ${FONT_SIZE.M};
    padding: 5px;
    position: relative;
    text-align: center;
    text-transform: capitalize;
    width: 100%;
`;

const EnterValueModal = ({
    open,
    close,
    date,
    target,
    targetType,
    value,
    setValue,
}) => {
    const [valueInternal, setValueInternal] = useState(value);

    return (
        <ModalContainer open={open} close={close}>
            <h4>Enter value</h4>
            <Label>{date}</Label>
            <Flex>
                <LabelPrepend>{targetType}</LabelPrepend>
                <Input
                    onChange={(e) => setValueInternal(e.target.value)}
                    placeholder={target}
                    type="text"
                    value={valueInternal || ""}
                />
            </Flex>
            <Button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setValue(valueInternal);
                    setValueInternal(null);
                }}
            >
                Submit
            </Button>
        </ModalContainer>
    );
};

const HabitList = ({}) => {
    const { state } = useContext(MainContext);
    const [date, setDate] = useState(HabitHelper.momentizeDate().currWeekStart);
    const [habits, setHabits] = useState(null);
    const [mode, setMode] = useState(MODE.NONE);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHabit, setSelectedHabit] = useState(null);
    const [showEnterValueModal, setShowEnterValueModal] = useState(false);

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

    const getValueForDay = (habit, day) => {
        return HabitHelper.getDateInTimeline(
            habit,
            moment(date).add(day, "days")
        );
    };

    const onDayClicked = (habit, day) => {
        if (
            moment(date).add(day, "days").format("YYYY-MM-DD") >
            moment().format("YYYY-MM-DD")
        ) {
            return;
        }
        if (habit.type === HABIT.TYPE.ENTER_VALUE) {
            setSelectedDay(day);
            setSelectedHabit(habit);
            setShowEnterValueModal(true);
            return;
        }
        HabitHelper.updateDateInTimeline(
            state.currentUser.getUserId(),
            habit,
            moment(date).add(day, "days"),
            true,
            () => loadHabits()
        );
    };

    const onValueEntered = (value) => {
        HabitHelper.updateDateInTimeline(
            state.currentUser.getUserId(),
            selectedHabit,
            moment(date).add(selectedDay, "days"),
            value,
            () => {
                setSelectedDay(null);
                setSelectedHabit(null);
                setShowEnterValueModal(false);
                loadHabits();
            }
        );
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
                            <Text fontWeight={FONT_WEIGHT.BOLD}>
                                {habit.title}
                            </Text>
                            <Flex justifyContent="space-between">
                                <Text>Streak</Text>
                                <Text>
                                    {
                                        HabitHelper.getHabitMetrics(habit)
                                            .currStreak
                                    }
                                </Text>
                            </Flex>
                            <Category
                                background={COLORS.CATEGORY[habit.category]}
                            >
                                {habit.category}
                            </Category>
                        </TitleContainer>
                        {[0, 1, 2, 3, 4, 5, 6].map((day, idx) => (
                            <Day
                                key={idx}
                                className={classNames("backgroundHoverable", {
                                    disabled:
                                        moment(date)
                                            .add(idx, "days")
                                            .format("YYYY-MM-DD") >
                                        moment().format("YYYY-MM-DD"),
                                    enterValue:
                                        habit.type === HABIT.TYPE.ENTER_VALUE,
                                    highlight: getValueForDay(habit, idx),
                                })}
                                onClick={() => {
                                    onDayClicked(habit, day);
                                }}
                            >
                                <Text fontSize={FONT_SIZE.L}>
                                    {getValueForDay(habit, idx)}
                                    <CompleteIcon>
                                        {IconHelper.getIcon(ICON.CHECK)}
                                    </CompleteIcon>
                                </Text>
                            </Day>
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
            {selectedHabit && showEnterValueModal && (
                <EnterValueModal
                    open={showEnterValueModal}
                    close={() => {
                        setSelectedDay(null);
                        setSelectedHabit(null);
                        setShowEnterValueModal(false);
                    }}
                    date={moment(date)
                        .add(selectedDay, "days")
                        .format("YYYY-MM-DD")}
                    target={selectedHabit.target}
                    targetType={selectedHabit.targetType}
                    value={getValueForDay(selectedHabit, selectedDay)}
                    setValue={(value) => onValueEntered(value)}
                />
            )}
        </ListContainer>
    );
};

export default HabitList;
