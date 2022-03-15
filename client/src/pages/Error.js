import React, { useEffect } from "react";
import { navigate } from "hookrouter";
import styled from "styled-components";

import { IMAGES } from "../images";
import { PAGES } from "../res";
import { Button, PageContainer } from "../styles";

const Container = styled("div")`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    text-align: center;
    width: 100%;
`;

const Logo = styled("a")`
    & img {
        height: 75px;
        margin: 10px;
        width: 75px;
    }
`;

const Error = ({ message = "Page not found" }) => {
    useEffect(() => {
        if (message === "Invalid state") {
            navigate("/");
        }
    }, [message]);

    return (
        <PageContainer>
            <Container>
                <Logo href="/">
                    <img src={IMAGES.LOGO} alt="Logo" />
                </Logo>
                <p>{message}</p>
                <a href="/">Go Home</a>
            </Container>
        </PageContainer>
    );
};

export default Error;
