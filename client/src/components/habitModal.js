import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { ModalContainer } from ".";
import { HABIT } from "../res";
import { Button, Flex, Input, LabelPrepend, Select } from "../styles";

const Wrapper = styled("div")`
    position: relative;
`;

const HabitModal = ({ open, close, habitData, setHabitData }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState(HABIT.TYPE.CHECK_OFF);
    const [category, setCategory] = useState(null);
    const [target, setTarget] = useState(null);
    const [targetType, setTargetType] = useState(null);

    useEffect(() => {
        if (!habitData) return;
        setTitle(habitData.title);
        setDescription(habitData.description);
        setType(habitData.type);
        setCategory(habitData.category);
        setTarget(habitData.target);
        setTargetType(habitData.targetType);
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
                <Flex>
                    <LabelPrepend>Category</LabelPrepend>
                    <Select
                        onChange={(e) => setCategory(e.target.value)}
                        value={type}
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
                        type="text"
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

                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        setHabitData({
                            title,
                            description,
                            type,
                            category,
                            target,
                            targetType,
                        });
                    }}
                    width="100px"
                >
                    Save
                </Button>
            </Wrapper>
        </ModalContainer>
    );
};

export default HabitModal;
