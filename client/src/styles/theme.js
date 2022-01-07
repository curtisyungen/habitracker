import styled from "styled-components";

import { HABIT, SIZE } from "../res";

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
    GRAY_DARK: "#808080",
    GRAY_LIGHT: "#f2f2f2",
    THEME: {
        BACKGROUND: {
            [THEME.DARK]: "rgba(0, 0, 0, 0.85)",
            [THEME.LIGHT]: "rgba(255, 255, 255, 0.85)",
        },
        BACKGROUND_HOVER: {
            [THEME.DARK]: "rgba(35, 35, 35, 1)",
            [THEME.LIGHT]: "rgba(235, 235, 235, 0.85)",
        },
        BORDER: {
            [THEME.DARK]: "#505050",
            [THEME.LIGHT]: "#000000",
        },
        COLOR: {
            [THEME.DARK]: "#ffffff",
            [THEME.LIGHT]: "#000000",
        },
        DISABLED: {
            [THEME.DARK]: "#404040",
            [THEME.LIGHT]: "#c2c2c2",
        },
        HIGHLIGHT: {
            [THEME.DARK]: "#83c1ff",
            [THEME.LIGHT]: "#7ab4ff",
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
    XXXL: "30px",
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

export const SCROLLBAR_STYLE = `
    ::-webkit-scrollbar {
        display: block;
        height: ${SIZE.SCROLLBAR_WIDTH};
        width: ${SIZE.SCROLLBAR_WIDTH};
    }
    ::-webkit-scrollbar-track {
        background: #c2c2c2;
    }
    ::-webkit-scrollbar-thumb {
        background: #555555;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #333333;
    }
`;

export const TRANSITION = {
    VERY_SLOW: "1s",
    SLOW: "0.5s",
    NORMAL: "0.35s",
    FAST: "0.20s",
    VERY_FAST: "0.10s",
};

export const AppContainer = styled("div")`
    --background: ${(props) => COLORS.THEME.BACKGROUND[props.theme]};
    --backgroundDisabled: ${(props) => COLORS.THEME.DISABLED[props.theme]};
    --backgroundHover: ${(props) => COLORS.THEME.BACKGROUND_HOVER[props.theme]};
    --borderColor: ${(props) => COLORS.THEME.BORDER[props.theme]};
    --color: ${(props) => COLORS.THEME.COLOR[props.theme]};
    --highlight: ${(props) => COLORS.THEME.HIGHLIGHT[props.theme]};

    background: var(--background);
    border-color: var(--borderColor);
    color: var(--color);
    height: 100%;
    min-height: 100vh;
    min-width: 100vw;
    position: relative;
    width: 100%;

    & .background {
        background: var(--background);
    }
    & .backgroundHoverable {
        &:hover {
            background: var(--backgroundHover);
        }
    }
    & .borderColor {
        border-color: var(--borderColor);
    }
    & .color {
        color: var(--color);
    }
    & .disabled {
        background: var(--backgroundDisabled);
        cursor: default !important;
        opacity: 0.5 !important;

        &:hover {
            background: var(--backgroundDisabled) !important;
        }
    }
    & .highlight {
        background: var(--highlight);
        color: ${COLORS.BLACK};

        &:hover {
            background: var(--highlight);
            color: ${COLORS.BLACK};
        }
    }

    & button,
    input,
    select {
        background: var(--background);
        border-color: var(--borderColor);
        border-radius: 0px;
        color: var(--color);
    }
`;
