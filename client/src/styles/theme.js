import styled from "styled-components";

export const COLORS = {
    BLACK: "#000000",
    THEME_DARK_BORDER: "#ffffff",
    THEME_DARK_TEXT: "#ffffff",
    THEME_LIGHT_BORDER: "#000000",
    THEME_LIGHT_TEXT: "#000000",
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

export const THEME = {
    DARK: "Dark",
    LIGHT: "Light",
};

export const THEME_COLORS = {
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

    --background: ${(props) => THEME_COLORS.BACKGROUND[props.theme]};
    --borderColor: ${(props) => THEME_COLORS.BORDER[props.theme]};
    --color: ${(props) => THEME_COLORS.COLOR[props.theme]};

    & .background {
        background: var(--background);
    }
    & .borderColor {
        border-color: var(--borderColor);
    }
    & .color {
        color: var(--color);
    }

    & button,
    input,
    select {
        background: var(--background);
        border-color: var(--borderColor);
        color: var(--color);
    }
`;
