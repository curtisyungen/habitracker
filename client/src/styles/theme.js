import styled from "styled-components";

import { HABIT } from "../res";

export const THEME = {
    DARK: "Dark",
    LIGHT: "Light",
};

export const COLORS = {
    BLACK: "#000000",
    CATEGORY: {
        [HABIT.CATEGORY.ART]: "yellow",
        [HABIT.CATEGORY.DIET]: "gray",
        [HABIT.CATEGORY.FITNESS]: "purple",
        [HABIT.CATEGORY.HEALTH]: "green",
        [HABIT.CATEGORY.MUSIC]: "blue",
        [HABIT.CATEGORY.OTHER]: "lightgray",
        [HABIT.CATEGORY.PERSONAL]: "brown",
        [HABIT.CATEGORY.RECREATION]: "teal",
    },
    THEME: {
        BACKGROUND: {
            [THEME.DARK]: "rgba(0, 0, 0, 0.85)",
            [THEME.LIGHT]: "rgba(255, 255, 255, 0.85)",
        },
        BORDER: {
            [THEME.DARK]: "#ffffff",
            [THEME.LIGHT]: "#000000",
        },
        COLOR: {
            [THEME.DARK]: "#ffffff",
            [THEME.LIGHT]: "#000000",
        },
        HIGHLIGHT: {
            [THEME.DARK]: "gold",
            [THEME.LIGHT]: "lightblue",
        },
    },
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

export const FONT_WEIGHT = {
    BOLD: 700,
    NORMAL: 400,
};

export const SCREEN_SIZE = {
    XS: "320px",
    S: "580px",
    M: "768px",
    L: "1024px",
    XL: "1400px",
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

    --background: ${(props) => COLORS.THEME.BACKGROUND[props.theme]};
    --borderColor: ${(props) => COLORS.THEME.BORDER[props.theme]};
    --color: ${(props) => COLORS.THEME.COLOR[props.theme]};
    --highlight: ${(props) => COLORS.THEME.HIGHLIGHT[props.theme]};

    & .background {
        background: var(--background);
    }
    & .borderColor {
        border-color: var(--borderColor);
    }
    & .color {
        color: var(--color);
    }
    & .highlight {
        background: var(--highlight);
        color: ${COLORS.BLACK};
    }

    & button,
    input,
    select {
        background: var(--background);
        border-color: var(--borderColor);
        color: var(--color);
    }
`;
