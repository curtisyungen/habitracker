import React, { useContext } from "react";
import Modal from "react-responsive-modal";
import styled from "styled-components";

import { MainContext } from "../App";
import { COLORS } from "../styles/theme";

import "react-responsive-modal/styles.css";

const Body = styled("div")`
    & button,
    input,
    select {
        background: ${(props) => COLORS.THEME.BACKGROUND[props.theme]};
        border-color: ${(props) => COLORS.THEME.BORDER[props.theme]};
        color: ${(props) => COLORS.THEME.COLOR[props.theme]};

        &:hover {
            background: ${(props) =>
                COLORS.THEME.BACKGROUND_HOVER[props.theme]};
        }
    }
`;

const ModalContainer = ({ open, close, children }) => {
    const { state } = useContext(MainContext);

    const getModalStyles = () => {
        const theme = state.currentUser.getTheme();
        return {
            background: COLORS.THEME.BACKGROUND[theme],
            borderColor: COLORS.THEME.BORDER[theme],
            borderStyle: "solid",
            borderWidth: "1px",
            color: COLORS.THEME.COLOR[theme],
            margin: "0px",
            marginTop: "10px",
            maxWidth: "600px",
            minHeight: "300px",
            minWidth: "300px",
            width: "100%",
        };
    };

    return (
        <Modal
            open={open}
            onClose={close}
            styles={{
                closeIcon: {
                    outline: "none",
                },
                modal: getModalStyles(),
            }}
            animationDuration={0}
        >
            <Body theme={state.currentUser.getTheme()}>{children}</Body>
        </Modal>
    );
};

export default ModalContainer;
