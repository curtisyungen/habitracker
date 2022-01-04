import React from "react";
import { navigate } from "hookrouter";
import Loader from "react-loader-spinner";
import styled from "styled-components";

import { PAGES } from "../res";
import { COLORS, FONT_SIZE } from "../styles/theme";

const Container = styled("div")`
    height: 100%;
    min-height: 100vh;
    min-width: 100vw;
    position: relative;
    text-align: center;
    width: 100%;
`;

const Text = styled("div")`
    cursor: pointer;
    font-size: ${FONT_SIZE.S};
    margin-top: 10px;
`;

const LoadingIcon = () => {
    return (
        <Loader
            color={COLORS.BLACK}
            height={75}
            radius={8}
            timeout={20000}
            type="Puff"
            width={75}
        />
    );
};

const Loading = ({ iconOnly = false }) => {
    if (iconOnly) {
        return <LoadingIcon />;
    }
    return (
        <Container className="background color">
            <div
                style={{
                    left: "50%",
                    position: "absolute",
                    top: "40%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <LoadingIcon />
                <Text
                    onClick={() => {
                        navigate(PAGES.LOGIN);
                    }}
                >
                    Cancel
                </Text>
            </div>
        </Container>
    );
};

export default Loading;
