import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";

import { MainContext } from "../App";
import { HabitComponent, HabitModal, Loading } from ".";
import { DateHelper, ICON, IconHelper, StringHelper } from "../helpers";
import { SIZE, STATUS } from "../res";
import { Button, Grid, Scrollable, Text } from "../styles";
import { FONT_SIZE } from "../styles/theme";
import { habitAPI } from "../utils";

const ListBody = styled("div")`
    margin-top: 4px;
    max-height: calc(100vh - 220px);
    min-width: fit-content;
    overflow-x: hidden;
    overflow-y: scroll;
`;

const ListContainer = styled("div")`
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
        min-width: ${SIZE.HABIT_COLUMN_WIDTH};
    }
`;

const HabitList = () => {
    const { state } = useContext(MainContext);
    const [startDate, setStartDate] = useState(DateHelper.getCurrWeekStart());
    const [dates, setDates] = useState(null);
    const [habits, setHabits] = useState(null);
    const [inAddMode, setInAddMode] = useState(false);
    const [inHiddenMode, setInHiddenMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        habitAPI
            .getAllHabitsForUser(state.currentUser.getUserId())
            .then((res) => {
                setHabits(res.data);
                setIsLoading(false);
            });
    };

    const reloadHabit = (habitId) => {
        habitAPI.getHabitById(habitId).then((res) => {
            const _habits = JSON.parse(JSON.stringify(habits));
            for (var i = 0; i < habits.length; i++) {
                if (_habits[i].id === habitId) {
                    _habits[i] = res.data;
                    setHabits(_habits);
                    break;
                }
            }
        });
    };

    const createHabit = (data) => {
        habitAPI
            .createHabit(state.currentUser.getUserId(), {
                title: data.title,
                description: data.description,
                type: data.type,
                category: data.category,
                target: data.target,
                targetType: data.targetType,
                timeline: StringHelper.stringifyJSON(data.timeline),
                status: data.status,
            })
            .then(() => {
                loadHabits();
                setInAddMode(false);
            });
    };

    const scrollDate = (dir) => {
        switch (dir) {
            case -1:
                setStartDate(DateHelper.getPrevWeekStart(startDate));
                break;
            case 1:
                setStartDate(DateHelper.getNextWeekStart(startDate));
                break;
            case 0:
            default:
                setStartDate(DateHelper.getCurrWeekStart());
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!habits) {
        return <></>;
    }

    return (
        <>
            <ListContainer>
                <Grid
                    gridTemplateColumns="repeat(2, 1fr)"
                    margin="2px 0px"
                    width="200px"
                >
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            setInAddMode(true);
                        }}
                        width="100px"
                    >
                        {IconHelper.getIcon(ICON.ADD)}
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            setInHiddenMode(!inHiddenMode);
                        }}
                        width="100px"
                    >
                        {inHiddenMode
                            ? IconHelper.getIcon(ICON.VISIBLE)
                            : IconHelper.getIcon(ICON.HIDDEN)}
                    </Button>
                </Grid>
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
                <Scrollable direction="x">
                    <ListHeader>
                        <Text className="background borderColor">Title</Text>
                        {dates.map((d, idx) => (
                            <Text key={idx} className="background borderColor">
                                <Text>{moment(d).format("dddd")}</Text>
                                <Text>{d}</Text>
                            </Text>
                        ))}
                    </ListHeader>
                    <ListBody className="borderColor">
                        {habits
                            .filter((h) =>
                                inHiddenMode
                                    ? h.status === STATUS.INACTIVE
                                    : h.status === STATUS.ACTIVE
                            )
                            .map((h, idx) => (
                                <HabitComponent
                                    key={idx}
                                    habitData={h}
                                    dates={dates}
                                    reloadHabit={reloadHabit}
                                />
                            ))}
                    </ListBody>
                </Scrollable>
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
