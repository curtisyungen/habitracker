import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import moment from "moment";
import styled from "styled-components";

import { MainContext } from "../App";
import { HabitModal, ModalContainer } from ".";
import { HabitHelper, ICON, IconHelper } from "../helpers";
import { HABIT, SIZE } from "../res";
import { Button, Flex, Input, Label, LabelPrepend, Text } from "../styles";
import { COLORS, FONT_SIZE, FONT_WEIGHT, TRANSITION } from "../styles/theme";
import { habitAPI } from "../utils";

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

    &.enterValue.highlight ${CompleteIcon} {
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

const HabitContainer = styled("div")`
    display: grid;
    grid-gap: 2px;
    grid-template-columns: repeat(8, 1fr);
    margin-top: 2px;
    min-width: 100%;
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
    width: 100px;
`;

const TODAY = moment().format("YYYY-MM-DD");

const Habit = ({ habit, dates }) => {
    const { state } = useContext(MainContext);
    const [selectedDate, setSelectedDate] = useState(null);
    const [inEditMode, setInEditMode] = useState(false);
    const [inEnterValueMode, setInEnterValueMode] = useState(false);

    const onDayClicked = (date) => {
        if (date > TODAY) {
            return;
        }
        if (habit.type === HABIT.TYPE.ENTER_VALUE) {
            setInEnterValueMode(true);
            setSelectedDate(date);
            return;
        }
        HabitHelper.updateDateInTimeline(
            state.currentUser.getUserId(),
            habit,
            date,
            true
        );
    };

    const onValueEntered = (value) => {
        HabitHelper.updateDateInTimeline(
            state.currentUser.getUserId(),
            habit,
            selectedDate,
            value,
            () => {
                setInEnterValueMode(false);
                setSelectedDate(null);
            }
        );
    };

    const updateHabit = (habitData) => {
        habitAPI
            .updateHabit(state.currentUser.getUserId(), habitData.id, habitData)
            .then(() => {
                setInEditMode(false);
                setSelectedDate(null);
            });
    };

    if (!habit || !dates) {
        return <></>;
    }

    return (
        <>
            <HabitContainer>
                <TitleContainer
                    className="background borderColor"
                    onClick={() => {
                        setInEditMode(true);
                    }}
                >
                    <Text fontWeight={FONT_WEIGHT.BOLD}>{habit.title}</Text>
                    <Flex justifyContent="space-between">
                        <Text>Streak</Text>
                        <Text>
                            {HabitHelper.getHabitMetrics(habit).currStreak}
                        </Text>
                    </Flex>
                    <Category background={COLORS.CATEGORY[habit.category]}>
                        {habit.category}
                    </Category>
                </TitleContainer>
                {dates.map((date, idx) => (
                    <Day
                        key={idx}
                        className={classNames("backgroundHoverable", {
                            disabled: date > TODAY,
                            enterValue: habit.type === HABIT.TYPE.ENTER_VALUE,
                            highlight: HabitHelper.getDateInTimeline(
                                habit,
                                date
                            ),
                        })}
                        onClick={() => {
                            onDayClicked(date);
                        }}
                    >
                        <Text fontSize={FONT_SIZE.L}>
                            {HabitHelper.getDateInTimeline(habit, date)}
                            <CompleteIcon>
                                {IconHelper.getIcon(ICON.CHECK)}
                            </CompleteIcon>
                        </Text>
                    </Day>
                ))}
            </HabitContainer>

            <EnterValueModal
                open={inEnterValueMode}
                close={() => {
                    setInEnterValueMode(false);
                    setSelectedDate(null);
                }}
                date={selectedDate}
                target={habit.target}
                targetType={habit.targetType}
                value={HabitHelper.getDateInTimeline(habit, selectedDate)}
                setValue={(value) => onValueEntered(value)}
            />

            <HabitModal
                open={inEditMode}
                close={() => setInEditMode(false)}
                habitData={habit}
                setHabitData={updateHabit}
            />
        </>
    );
};

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

export default Habit;
