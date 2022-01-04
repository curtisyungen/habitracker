import styled from "styled-components";

export const COLORS = {
    BLACK: "#000000",
    WHITE: "#ffffff",
};

export const FONT_SIZE = {
    XS: "10px",
    S: "11px",
    M: "13px",
    L: "15px",
    XL: "18px",
    XXL: "24px",
};

export const TRANSITION = {
    VERY_SLOW: "1s",
    SLOW: "0.5s",
    NORMAL: "0.35s",
    FAST: "0.20s",
    VERY_FAST: "0.10s",
};

export const AppContainer = styled("div")`
    height: 100%;
    min-height: 100vh;
    min-width: 100vw;
    position: relative;
    width: 100%;
`;
