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

const Logo = styled("img")`
    cursor: pointer;
    height: 75px;
    margin: 10px;
    width: 75px;
`;

const Error = ({error }) => {
    useEffect(() => {
        if (error.message === "Invalid state") {
            navigate("/");
        }
    }, [error]);

    return (
        <PageContainer>
            <Container>
                <Logo
                    onClick={() => navigate("/")}
                    src={IMAGES.LOGO}
                    alt="Logo"
                />
                <p>{message}</p>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                    }}
                    width="100px"
                >
                    Go Home
                </Button>
            </Container>
        </PageContainer>
    );
};

export default Error;
