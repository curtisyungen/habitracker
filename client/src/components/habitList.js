import React, { useContext } from "react";
import styled from "styled-components";

import { MainContext } from "../App";

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

const HabitList = ({}) => {
    const { state } = useContext(MainContext);

    return <Container></Container>;
};

export default HabitList;
