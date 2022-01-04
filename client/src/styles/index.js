import styled from "styled-components";

import { SIZE } from "../res";
import { COLORS, FONT_SIZE, SCREEN_SIZE } from "./theme";

export const Button = styled("button")`
    border-radius: 0px;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    outline: none;
    user-select: none;
    width: ${(props) => props.width || "100%"};

    &:active,
    :focus {
        outline: none;
    }
`;

export const Flex = styled("div")`
    display: flex;
    flex-direction: ${(props) => props.flexDirection || "row"};
    flex-wrap: ${(props) => props.flexWrap || "nowrap"};
    justify-content: ${(props) => props.justifyContent || "start"};
`;

export const Grid = styled("div")`
    display: grid;
    grid-gap: ${(props) => props.gridGap || "2px"};
    grid-template-columns: ${(props) => props.gridTemplateColumns || "unset"};
    grid-template-rows: ${(props) => props.gridTemplateRows || "unset"};
    width: ${(props) => props.width || "100%"};
`;

export const Input = styled("input")`
    border: 0px;
    border-bottom-width: 1px;
    border-radius: 0px;
    border-style: solid;
    font-size: ${(props) => props.fontSize || FONT_SIZE.M};
    height: ${SIZE.INPUT_HEIGHT};
    min-width: ${SIZE.INPUT_MIN_WIDTH};
    outline: none;
    width: ${(props) => props.width || "100%"};

    &:active,
    :focus {
        outline: none;
    }
`;

export const Label = styled("label")`
    border: 0px;
    border-bottom-width: 1px;
    border-radius: 0px;
    border-style: solid;
    font-size: ${(props) => props.fontSize || FONT_SIZE.M};
    height: ${(props) => props.height || SIZE.INPUT_HEIGHT};
    line-height: ${(props) => props.height || SIZE.INPUT_HEIGHT};
    min-width: ${SIZE.INPUT_MIN_WIDTH};
    text-align: ${(props) => props.textAlign || "center"};
    width: ${(props) => props.width || SIZE.INPUT_MIN_WIDTH};
`;

export const LabelAppend = styled(Label)`
    margin-left: 5px;
`;

export const LabelPrepend = styled(Label)`
    margin-right: 5px;
`;

export const PageContainer = styled("div")`
    height: 100%;
    min-height: 100vh;
    min-width: 100vw;
    padding: 0px 100px;
    position: relative;
    width: 100%;

    @media (max-width: ${SCREEN_SIZE.M}) {
        padding: 0px 5px;
    }

    @media (max-width: ${SCREEN_SIZE.S}) {
        padding: 0px;
    }
`;

export const Select = styled("select")`
    border: 0px;
    border-bottom-width: 1px;
    border-style: solid;
    font-size: ${(props) => props.fontSize || FONT_SIZE.M};
    height: ${(props) => props.height || SIZE.INPUT_HEIGHT};
    line-height: ${(props) => props.height || SIZE.INPUT_HEIGHT};
    margin-left: ${(props) => props.marginLeft || "0px"};
    margin-right: ${(props) => props.marginRight || "0px"};
    min-width: ${SIZE.INPUT_MIN_WIDTH};
    outline: none;
    width: ${(props) => props.width || "100%"};

    &:active,
    :focus {
        outline: none;
    }
`;

export const Spacer = styled("div")`
    height: ${(props) => props.height || "0px"};
    width: 100%;
`;

export const Text = styled("div")`
    font-size: ${(props) => props.fontSize || FONT_SIZE.M};
    text-align: ${(props) => props.textAlign || "center"};
`;
