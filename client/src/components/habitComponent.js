import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import moment from "moment";
import styled from "styled-components";

import { MainContext } from "../App";
import { HabitModal, ModalContainer } from ".";
import { Habit } from "../classes";
import { DateHelper, ICON, IconHelper } from "../helpers";
import { HABIT, SIZE } from "../res";
import {
    Button,
    Flex,
    Input,
    Label,
    LabelPrepend,
    Text,
    TextSmall,
} from "../styles";
import { COLORS, FONT_SIZE, FONT_WEIGHT, TRANSITION } from "../styles/theme";
import { habitAPI } from "../utils";

const Category = styled("div")`
    background: ${(props) => props.background || "transparent"};
    border: 0px;
    border-style: solid;
    border-top-width: 1px;
    bottom: 0;
    color: white;
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
    min-width: ${SIZE.HABIT_COLUMN_WIDTH};
    position: relative;
    text-align: center;
    transition: ${TRANSITION.FAST};
    width: 100%;

    &.disabled ${CompleteIcon} {
        display: none;
    }

    &.disabled #enterValueText {
        display: none;
    }

    &.enterValue.highlight ${CompleteIcon} {
        display: none;
    }

    & #enterValueText {
        opacity: 0;
    }

    &.highlight {
        & #enterValueText {
            display: none;
        }
        
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
        &.enterValue {
            & #enterValueText {
                opacity: 0.5;
            }

            & ${CompleteIcon} {
                display: none;
            }
        }

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
    height: ${SIZE.HABIT_HEIGHT};
    margin-top: 2px;
    min-width: 100%;
    width: 100%;
`;

const MetricsContainer = styled("div")``;

const TitleContainer = styled("div")`
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    font-size: ${FONT_SIZE.S};
    padding: 5px;
    position: relative;
    text-align: center;
    text-transform: capitalize;
    min-width: ${SIZE.HABIT_COLUMN_WIDTH};
`;

const TODAY = moment().format("YYYY-MM-DD");

const HabitComponent = ({ habitData, dates, reloadHabit }) => {
    const { state } = useContext(MainContext);
    const [habit, setHabit] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [inEditMode, setInEditMode] = useState(false);
    const [inEnterValueMode, setInEnterValueMode] = useState(false);

    useEffect(() => {
        if (!habitData) return;
        setHabit(new Habit({ ...habitData }));
    }, [habitData]);

    const onDayClicked = (date) => {
        if (date > TODAY) {
            return;
        }
        if (habit.getType() === HABIT.TYPE.ENTER_VALUE) {
            setInEnterValueMode(true);
            setSelectedDate(date);
            return;
        }
        updateDateInTimeline(date, true);
    };

    const onValueEntered = (value) => {
        updateDateInTimeline(selectedDate, value);
        setInEnterValueMode(false);
        setSelectedDate(null);
    };

    const updateDateInTimeline = (date, value) => {
        const { year, month, day } = DateHelper.getYearMonthDay(date);

        const newTimeline = JSON.parse(JSON.stringify(habit.getTimeline()));

        if (!newTimeline[year]) {
            newTimeline[year] = {};
        }

        if (!newTimeline[year][month]) {
            newTimeline[year][month] = {};
        }

        if (!newTimeline[year][month][day]) {
            newTimeline[year][month][day] = value;
        } else {
            delete newTimeline[year][month][day];

            if (Object.keys(newTimeline[year][month]).length === 0) {
                delete newTimeline[year][month];

                if (Object.keys(newTimeline[year]).length === 0) {
                    delete newTimeline[year];
                }
            }
        }

        setHabit((habit) => new Habit({ ...habit, timeline: newTimeline }));

        habitAPI.updateHabit(state.currentUser.getUserId(), habit.getId(), {
            timeline: JSON.stringify(newTimeline),
        });
    };

    const updateHabit = (habitData) => {
        habitAPI
            .updateHabit(state.currentUser.getUserId(), habitData.id, habitData)
            .then(() => {
                setInEditMode(false);
                setSelectedDate(null);
                reloadHabit(habitData.id);
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
                    <Text fontWeight={FONT_WEIGHT.BOLD}>
                        {habit.getTitle()}
                    </Text>
                    {habit.getTarget() && (
                        <Flex justifyContent="space-between">
                            <TextSmall>
                                {IconHelper.getIcon(ICON.TARGET)}
                            </TextSmall>
                            <TextSmall>{habit.getTarget()}</TextSmall>
                        </Flex>
                    )}
                    <MetricsContainer>
                        <Flex justifyContent="space-between">
                            <TextSmall>Streak</TextSmall>
                            <TextSmall>
                                {habit.getMetrics().currStreak}
                            </TextSmall>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <TextSmall>Longest</TextSmall>
                            <TextSmall>
                                {habit.getMetrics().longestStreak}
                            </TextSmall>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <TextSmall>Total</TextSmall>
                            <TextSmall>
                                {habit.getMetrics().totalCompletions}
                            </TextSmall>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <TextSmall>Latest</TextSmall>
                            <TextSmall>
                                {habit.getMetrics().mostRecentCompletion}
                            </TextSmall>
                        </Flex>
                    </MetricsContainer>
                    <Category background={COLORS.CATEGORY[habit.getCategory()]}>
                        {habit.getCategory()}
                    </Category>
                </TitleContainer>
                {dates.map((date, idx) => (
                    <Day
                        key={idx}
                        className={classNames("backgroundHoverable", {
                            disabled: date > TODAY,
                            enterValue:
                                habit.getType() === HABIT.TYPE.ENTER_VALUE,
                            highlight: habit.getDateInTimeline(date),
                        })}
                        onClick={() => {
                            onDayClicked(date);
                        }}
                    >
                        <Text fontSize={FONT_SIZE.L}>
                            {habit.getDateInTimeline(date)}
                            <CompleteIcon>
                                {IconHelper.getIcon(ICON.CHECK)}
                            </CompleteIcon>
                            <Text id="enterValueText">Enter value</Text>
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
                target={habit.getTarget()}
                targetType={habit.getTargetType()}
                value={habit.getDateInTimeline(selectedDate)}
                setValue={(value) => onValueEntered(value)}
            />
            <HabitModal
                open={inEditMode}
                close={() => setInEditMode(false)}
                habitData={habitData}
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

export default HabitComponent;
