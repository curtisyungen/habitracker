import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ModalContainer } from ".";
import { StringHelper } from "../helpers";
import { HABIT, STATUS } from "../res";
import {
    Absolute,
    Button,
    Flex,
    Input,
    LabelPrepend,
    Select,
    Text,
} from "../styles";

const Wrapper = styled("div")`
    position: relative;
`;

const HabitModal = ({ open, close, habitData, setHabitData, metrics }) => {
    const [id, setId] = useState(Math.random() * 1000000);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState(HABIT.TYPE.CHECK_OFF);
    const [category, setCategory] = useState(HABIT.CATEGORY.OTHER);
    const [target, setTarget] = useState(null);
    const [targetType, setTargetType] = useState(HABIT.TARGET_TYPE.AFTER_TIME);
    const [timeline, setTimeline] = useState({});
    const [status, setStatus] = useState(STATUS.ACTIVE);

    useEffect(() => {
        if (!habitData) return;
        setId(habitData.id);
        setTitle(habitData.title);
        setDescription(habitData.description);
        setType(habitData.type);
        setCategory(habitData.category);
        setTarget(habitData.target);
        setTargetType(habitData.targetType);
        setTimeline(StringHelper.parseJSON(habitData.timeline));
        setStatus(habitData.status);
    }, [habitData]);

    return (
        <ModalContainer open={open} close={close}>
            <Wrapper>
                <Flex>
                    <LabelPrepend>Title</LabelPrepend>
                    <Input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        value={title}
                    />
                </Flex>
                <Flex>
                    <LabelPrepend>Description</LabelPrepend>
                    <Input
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        value={description}
                    />
                </Flex>
                {!habitData && (
                    <Flex>
                        <LabelPrepend>Type</LabelPrepend>
                        <Select
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                        >
                            {Object.keys(HABIT.TYPE).map((t, idx) => (
                                <option key={idx} value={HABIT.TYPE[t]}>
                                    {HABIT.TYPE[t]}
                                </option>
                            ))}
                        </Select>
                    </Flex>
                )}
                <Flex>
                    <LabelPrepend>Category</LabelPrepend>
                    <Select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    >
                        {Object.keys(HABIT.CATEGORY).map((c, idx) => (
                            <option key={idx} value={HABIT.CATEGORY[c]}>
                                {HABIT.CATEGORY[c]}
                            </option>
                        ))}
                    </Select>
                </Flex>
                <Flex>
                    <LabelPrepend>Target</LabelPrepend>
                    <Input
                        onChange={(e) => setTarget(e.target.value)}
                        type={
                            targetType === HABIT.TARGET_TYPE.BEFORE_TIME ||
                            targetType === HABIT.TARGET_TYPE.AFTER_TIME
                                ? "time"
                                : "text"
                        }
                        value={target}
                    />
                    <Select
                        marginLeft="5px"
                        onChange={(e) => setTargetType(e.target.value)}
                        value={targetType}
                        width="100px"
                    >
                        {Object.keys(HABIT.TARGET_TYPE).map((t, idx) => (
                            <option key={idx} value={HABIT.TARGET_TYPE[t]}>
                                {HABIT.TARGET_TYPE[t]}
                            </option>
                        ))}
                    </Select>
                </Flex>
                {habitData && (
                    <Flex>
                        <LabelPrepend>Status</LabelPrepend>
                        <Select
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                        >
                            {Object.keys(STATUS).map((s, idx) => (
                                <option key={idx} value={STATUS[s]}>
                                    {STATUS[s]}
                                </option>
                            ))}
                        </Select>
                    </Flex>
                )}
            </Wrapper>
            {metrics && (
                <Wrapper style={{ margin: "0px 0px 10px 0px" }}>
                    <Flex justifyContent="space-between">
                        <Text>Current streak</Text>
                        <Text>{metrics.currStreak}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                        <Text>Longest streak</Text>
                        <Text>{metrics.longestStreak}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                        <Text>Earliest completion</Text>
                        <Text>{metrics.earliestCompletion}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                        <Text>Most recent completion</Text>
                        <Text>{metrics.mostRecentCompletion}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                        <Text>Total completions</Text>
                        <Text>{metrics.totalCompletions}</Text>
                    </Flex>
                </Wrapper>
            )}
            <Button
                onClick={(e) => {
                    e.preventDefault();
                    setHabitData({
                        id,
                        title,
                        description,
                        type,
                        category,
                        target,
                        targetType,
                        timeline: JSON.stringify(timeline),
                        status,
                    });
                }}
            >
                Save
            </Button>
            <Button
                onClick={(e) => {
                    e.preventDefault();
                    close();
                }}
                style={{ marginTop: "2px" }}
            >
                Cancel
            </Button>
        </ModalContainer>
    );
};

export default HabitModal;
