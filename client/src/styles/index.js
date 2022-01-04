import styled from "styled-components";

import { COLORS, FONT_SIZE } from "./theme";

export const Button = styled("button")`
    border: 0px;
    border-radius: 0px;
    outline: none;
    user-select: none;
`;

export const Flex = styled("div")`
    display: flex;
    flex-direction: ${props => props.flexDirection || "row"};
    flex-wrap: ${props => props.flexWrap || "nowrap"};
    justify-content: ${props => props.justifyContent || "start"};
`;

export const PageContainer = styled("div")`
    height: 100%;
    min-height: 100vh;
    min-width: 100vw;
    position: relative;
    width: 100%;
`;
